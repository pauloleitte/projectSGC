angular.module('SGC').controller('AuthCtrl', [
    '$location',
    'msgs',
    AuthController
])
function AuthController($location, msgs) {

    const vm = this
    vm.getUser = () => ({ name: 'Paulo', email: 'paulo.leitte@live.com' })

    vm.logout = () => {
        console.log('Logout...')
    }

    vm.loginMode = true
    vm.changeMode = () => vm.loginMode = !vm.loginMode

    vm.login = () => {
        console.log(`Login...`)

    }
    vm.signup = () => {
        console.log(`Signup...`)    
    }

}

