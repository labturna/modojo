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
         * @returns {Boolean} - is route path '/users'
         */
        isCurrentRootParams(path) {
            return this.$route.name === path
        },
    },
};

