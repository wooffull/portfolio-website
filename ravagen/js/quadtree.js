"use strict";

var app = app || {};

(function () {

    /**
     * Reference: http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374
     */
    var Quadtree = function (level, bounds) {
        this.level = level;
        this.objects = [];
        this.bounds = bounds;
        this.nodes = [undefined, undefined, undefined, undefined]
    };
    Object.defineProperties(Quadtree, {
        MAX_OBJECTS : {
            value : 10
        },

        MAX_LEVELS : {
            value : 5
        }
    });
    Quadtree.prototype = Object.freeze(Object.create(Quadtree.prototype, {
        draw : {
            value : function (ctx) {
                for (var i = 0; i < this.nodes.length; i++) {
                    if (this.nodes[i] !== undefined) {
                        this.nodes[i].draw(ctx);
                    }
                }

                ctx.save();

                var colorPercentage = (Quadtree.MAX_LEVELS - this.level + 1) / (Quadtree.MAX_LEVELS + 1);

                ctx.strokeStyle = "rgb(256, 256, " + (256 * colorPercentage) + ")";
                ctx.strokeRect(
                  this.bounds.x,
                  this.bounds.y,
                  this.bounds.width,
                  this.bounds.height
                );

                ctx.restore();
            }
        },

        /**
        * Clears the quadtree
        */
        clear : {
            value : function () {
                this.objects = [];

                for (var i = 0; i < this.nodes.length; i++) {
                    if (this.nodes[i] !== undefined) {
                        this.nodes[i].clear();
                        this.nodes[i] = undefined;
                    }
                }
            }
        },

        /**
         * Splits the node into 4 subnodes
         */
        split : {
            value : function () {
                var halfWidth = ((this.bounds.width >> 1) + 0.5) | 0;
                var halfHeight = ((this.bounds.height >> 1) + 0.5) | 0;
                var x = (this.bounds.x + 0.5) | 0;
                var y = (this.bounds.y + 0.5) | 0;

                this.nodes[0] = new Quadtree(this.level + 1, {
                    x : x + halfWidth,
                    y : y,
                    width : halfWidth,
                    height : halfHeight
                });

                this.nodes[1] = new Quadtree(this.level + 1, {
                    x : x,
                    y : y,
                    width : halfWidth,
                    height : halfHeight
                });

                this.nodes[2] = new Quadtree(this.level + 1, {
                    x : x,
                    y : y + halfHeight,
                    width : halfWidth,
                    height : halfHeight
                });

                this.nodes[3] = new Quadtree(this.level + 1, {
                    x : x + halfWidth,
                    y : y + halfHeight,
                    width : halfWidth,
                    height : halfHeight
                });
            }
        },

        /**
         * Determine which node the objects belongs to. -1 means
         * the object cannot fully fit in a child node, and is part
         * of the parent node
         */
        getIndex : {
            value : function (physObj) {
                var index = -1;
                var verticalMidpoint = this.bounds.x + (this.bounds.width >> 1);
                var horizontalMidpoint = this.bounds.y + (this.bounds.height >> 1);
                var w = (Math.abs(Math.cos(physObj.rotation)) * physObj.width + Math.abs(Math.sin(physObj.rotation)) * physObj.height);
                var h = (Math.abs(Math.cos(physObj.rotation)) * physObj.height + Math.abs(Math.sin(physObj.rotation)) * physObj.width);
                var x = physObj.position.x;
                var y = physObj.position.y;

                // Object completely fits within top quadrants
                var topQuadrant = (y + (h >> 1) < horizontalMidpoint);

                // Object completely fits within bottom quadrants
                var bottomQuadrant = (y - (h >> 1) > horizontalMidpoint);

                // Object completely fits within left quadrants
                if (x + (w >> 1) < verticalMidpoint) {
                    if (topQuadrant) {
                        index = 1;
                    } else if (bottomQuadrant) {
                        index = 2;
                    } else {
                        index = 4;
                    }

                // Object completely fits within right quadrants
                } else if (x - (w >> 1) > verticalMidpoint) {
                    if (topQuadrant) {
                        index = 0;
                    } else if (bottomQuadrant) {
                        index = 3;
                    } else {
                        index = 5;
                    }
                }
                
                if (index === -1) {
                    if (topQuadrant && !bottomQuadrant) {
                        index = 6;
                    } else if (bottomQuadrant && !topQuadrant) {
                        index = 7;
                    }
                }

                return index;
            }
        },

        /**
         * Insert the object into the quadtree. If the node
         * exceeds the capacity, it will split and add all objects
         * to their corresponding nodes
         */
        insert : {
            value : function (physObj) {
                if (this.nodes[0] !== undefined) {
                    var index = this.getIndex(physObj);

                    if (index > -1 && index < 4) {
                        this.nodes[index].insert(physObj);
                        return;
                    }
                }

                this.objects.push(physObj);

                if (this.objects.length > Quadtree.MAX_OBJECTS && this.level < Quadtree.MAX_LEVELS) {
                    if (this.nodes[0] === undefined) {
                        this.split();
                    }

                    var i = 0;
                    while (i < this.objects.length) {
                        var curObj = this.objects[i];

                        if (curObj === undefined) {
                            this.objects.splice(i, 1);
                            i++;
                        } else {
                            var index = this.getIndex(curObj);

                            if (index > -1 && index < 4) {
                                this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                            } else {
                                i++;
                            }
                        }
                    }
                }
            }
        },

        /**
         * Return all objects that could possibly collide with the given object
         */
        retrieve : {
            value : function (objs, physObj) {
                /*
                var index = this.getIndex(physObj);
                if (index !== -1 && this.nodes[0] !== undefined) {
                    this.nodes[index].retrieve(objs, physObj);
                }
                
                if (index === -1) {
                    for (var i = 0; i < this.nodes.length; i++) {
                        var node = this.nodes[i];
                        
                        if (node) {
                            node.retrieve(objs, physObj);
                        }
                    }
                }

                for (var i = 0; i < this.objects.length; i++) {
                    objs.push(this.objects[i]);
                }

                return objs;
                */
                
                if (this.nodes[0] !== undefined) {
                    var index = this.getIndex(physObj);
                  
                    switch (index) {
                    case 4: // In left quadrants
                        this.nodes[1].retrieve(objs, physObj);
                        this.nodes[2].retrieve(objs, physObj);
                        break;
                    case 5: // In right quadrants
                        this.nodes[0].retrieve(objs, physObj);
                        this.nodes[3].retrieve(objs, physObj);
                        break;
                    case 6: // In top quadrants
                        this.nodes[0].retrieve(objs, physObj);
                        this.nodes[1].retrieve(objs, physObj);
                        break;
                    case 7: // In bottom quadrants
                        this.nodes[2].retrieve(objs, physObj);
                        this.nodes[3].retrieve(objs, physObj);
                        break;
                    case -1: // In all quadrants
                        this.nodes[0].retrieve(objs, physObj);
                        this.nodes[1].retrieve(objs, physObj);
                        this.nodes[2].retrieve(objs, physObj);
                        this.nodes[3].retrieve(objs, physObj);
                        break;
                    default:
                        this.nodes[index].retrieve(objs, physObj);
                    }
                }

                objs.push.apply(objs, this.objects);

                return objs;
            }
        }
    }));
    Object.freeze(Quadtree);

    app.Quadtree = Quadtree;

})();