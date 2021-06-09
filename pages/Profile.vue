<template>
    <div class="row">
        <aside class="col-md-3">
            <ProfileMenu />
        </aside>

        <main class="col-md-9">
            <router-view></router-view>
        </main> <!-- col.// -->
    </div>
</template>
<script>
    import ProfileMenu from "../components/ProfileMenu";
    export default {
        name: 'profile',
        components: { ProfileMenu },
        mounted() {
            if (this.$route.name === 'profile'){
                this.$router.push('/profile/account')
            }
        }
    }
</script>
