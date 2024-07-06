// commons functions
export const commonMixin = {
    methods: {
        /**
         * @param {String} path - path to redirect.
         * @param {Object} this - path to redirect.
         * @returns No -redirect
         */
        redirectToResourcePage(path) {
            return this.$router.push(path)
        },
        
        /**
         * @returns {String} - is route path '/users'
         */
        getCurrentRootMethod() {
            return this.$route.name;
        },
    },
};

