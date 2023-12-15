<template>
    <nav>
        <router-link to="/">Головна</router-link> | <router-link to="/driver">Водії</router-link> |
        <router-link to="/buses">Автобуси</router-link> | <router-link to="/definition">Призначення</router-link> |
        <router-link to="/contacts">Контакти</router-link> |
    </nav>
    <router-view />
</template>

,
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 0px 150px;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.title {
    margin-bottom: 30px;
}
.link {
    border: 2px solid black;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: transparent;
    transition: all 0.3s ease 0s;
    text-decoration: none;
    font-size: 24px;
    &:hover {
        background-color: #35cf8a;
        color: #fff;
        border: 2px solid #2cc982;
    }
}
.table {
    margin-bottom: 20px;
    margin-left: 20px;
}

.active {
    display: flex;
    gap: 30px;
}
.text-center {
    font-size: 24px;
    font-weight: 700;
}
.loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
