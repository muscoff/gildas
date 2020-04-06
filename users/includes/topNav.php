<div class="min-height-8 navB">
        <div class="width-50"><i class="fas fa-bars menu" id="menu-btn"></i></div>
        <div class="width-50 flex-row-reverse menu-add">
            <div>
                <a href="<?=url;?>api/users/logout.php">
                    <i class="fas fa-power-off red-hover cursor-pointer"></i>
                </a>
            </div>
            <div class="padding-right-10">Welcome <span class="capitalize"><?=$_SESSION['user'];?></span></div>
        </div>
    </div>