<template>
    <div >
        <footer>&copy;Copyright {{ this.copyrightyear }}</footer>
    </div>
</template>

<script>

export default {
    data:function () {
        return {
            copyrightyear: String(new Date().getFullYear())
        }
    },
    
}
</script>