"use strict";

var app = app || {};

(function () {
    app.IMAGES = Object.freeze({
        ship : "ravagen/media/Ship.png",
        expandiumOrb : "ravagen/media/ExpandiumItem.png",
        expandiumRing : "ravagen/media/ExpandiumRing.png",
        healthOrbFull : "ravagen/media/HealthOrbFull.png",
        healthOrbEmpty : "ravagen/media/HealthOrbEmpty.png",
        powerUpBullet : "ravagen/media/PowerUp_Bullet.png",
        fullBlock : "ravagen/media/BlockFull.png",
        fullBlock2 : "ravagen/media/BlockFull2.png",
        fullBlock3 : "ravagen/media/BlockFull3.png",
        fullBlock4 : "ravagen/media/BlockFull4.png",
        halfBlock : "ravagen/media/BlockHalf.png",
        halfBlock2 : "ravagen/media/BlockHalf2.png",
        halfBlock3 : "ravagen/media/BlockHalf3.png",
        blockPillar : "ravagen/media/BlockPillar5.png",
        blockPillarR : "ravagen/media/BlockPillar5R.png",
        bgTile : "ravagen/media/BG-tile1.png",
        weakBullet_1 : "ravagen/media/BulletWeak_a.png",
        weakBullet_2 : "ravagen/media/BulletWeak_b.png",
        weakBullet_3 : "ravagen/media/BulletWeak_c.png",
        weakBullet_4 : "ravagen/media/BulletWeak_d.png",
        drainer_1 : "ravagen/media/Drainer_a.png",
        drainer_2 : "ravagen/media/Drainer_b.png",
        reflict : "ravagen/media/Reflict1.png",
        wallGel_1a : "ravagen/media/WallGel1.png",
        wallGel_1b : "ravagen/media/WallGel1_2.png",
        wallGel_2 : "ravagen/media/WallGel2.png",
        ravageMite_1 : "ravagen/media/RavageMite_a.png",
        ravageMite_2 : "ravagen/media/RavageMite_b.png",
        ravageMite_3 : "ravagen/media/RavageMite_c.png",
        absorber_1 : "ravagen/media/Absorber_a.png",
        absorber_2 : "ravagen/media/Absorber_b.png",
        absorber_3 : "ravagen/media/Absorber_c.png",
        absorber_4 : "ravagen/media/Absorber_d.png",
        spawnPoint : "ravagen/media/SpawnPoint.png",
        env_Plants1 : "ravagen/media/Env_plants1.png",
        env_Plants2a : "ravagen/media/Env_plants2_a.png",
        env_Plants2b : "ravagen/media/Env_plants2_b.png",
        env_Plants3a : "ravagen/media/Env_plants3_a.png",
        env_Plants3b : "ravagen/media/Env_plants3_b.png",
        env_Plants4a : "ravagen/media/Env_plants4_a.png",
        env_Plants4b : "ravagen/media/Env_plants4_b.png",
        env_Plants4c : "ravagen/media/Env_plants4_c.png",
        env_Plants4d : "ravagen/media/Env_plants4_d.png",
        env_Plants5a : "ravagen/media/Env_plants5_a.png",
        env_Plants5b : "ravagen/media/Env_plants5_b.png",
        env_Plants5c : "ravagen/media/Env_plants5_c.png",
        env_Plants5d : "ravagen/media/Env_plants5_d.png",
        exVisionist_left_1 : "ravagen/media/ExVisionist_left_a.png",
        exVisionist_left_2 : "ravagen/media/ExVisionist_left_b.png",
        exVisionist_left_3 : "ravagen/media/ExVisionist_left_c.png",
        exVisionist_middle_1 : "ravagen/media/ExVisionist_middle_a.png",
        exVisionist_middle_2 : "ravagen/media/ExVisionist_middle_b.png",
        exVisionist_middle_3 : "ravagen/media/ExVisionist_middle_c.png",
        exVisionist_right_1 : "ravagen/media/ExVisionist_right_a.png",
        exVisionist_right_2 : "ravagen/media/ExVisionist_right_b.png",
        exVisionist_right_3 : "ravagen/media/ExVisionist_right_c.png",
        exVisionist_aggr_left_1 : "ravagen/media/ExVisionist_aggr_left_a.png",
        exVisionist_aggr_middle_1 : "ravagen/media/ExVisionist_aggr_middle_a.png",
        exVisionist_aggr_right_1 : "ravagen/media/ExVisionist_aggr_right_a.png",
        exVisionistBullet : "ravagen/media/ExVisionistBullet.png",
        notificationBox : "ravagen/media/NotificationBox.png"
    });

    app.SOUNDS = Object.freeze({
        bgm_theme1 : "ravagen/sounds/bgm_Theme1.ogg",
        se_findItem : "ravagen/sounds/se_FindItem.ogg",
        se_shoot : "ravagen/sounds/se_Shoot.ogg",
        se_pulse : "ravagen/sounds/se_Pulse.ogg",
        se_crash : "ravagen/sounds/se_Crash.ogg",
        se_exhaust : "ravagen/sounds/se_Exhaust.ogg",
        se_explosion : "ravagen/sounds/se_Explosion.ogg",
        se_pickup : "ravagen/sounds/se_Pickup.ogg"
    });
})();