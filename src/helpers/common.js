// commons functions
import { marked } from "marked";
import hljs from "highlight.js";
import Difficulty from "../constant/enums/difficultyEnum";

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
         * @returns {String} - get current root'
         */
        getCurrentRootMethod() {
            return this.$route.name;
        },

        convertTextToMd(mdText) {
            return marked(mdText, {
              highlight: function (code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                  return hljs.highlight(lang, code).value;
                } else {
                  return hljs.highlightAuto(code).value;
                }
              },
              renderer: this.customRenderer(),
            });
          },

          customRenderer() {
            const renderer = new marked.Renderer();
            renderer.code = (code, lang) => {
              const highlighted = hljs.highlightAuto(code).value;
              return `
                <div class="code-block">
                  <pre><code class="hljs">${highlighted}</code></pre>
                </div>
              `;
            };
            return renderer;
          },
          difficultyStatusColor(status) {
            if (status === Difficulty.Easy) {
              return "green";
            } else if (status === Difficulty.Medium) {
              return "orange";
            } else return "red";
          },

          copyToContent(content) {
            const solutionTextElement = content;
            const dummy = document.createElement("textarea");
            dummy.value = solutionTextElement.innerText;
            document.body.appendChild(dummy);
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
          },
    },
};

