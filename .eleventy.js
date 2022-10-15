const { DateTime} = require('luxon');
const { minify } = require("terser");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

//  worked ok for img optimization in ./img folder

// (async () => {
//         let url = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/769380e3-9b00-4041-8f96-9fe23121cb2f/carla.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221015%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221015T013436Z&X-Amz-Expires=86400&X-Amz-Signature=b82c4b564eae3c9e3dfb5b44dd6dde216901a41e6b8c2693c652dcab03cf56d8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22carla.jpeg%22&x-id=GetObject"
//     let stats = await Image(url, {
//         formats: ["avif", "jpeg"],
//         widths: [600, 1000, 1600, 2400],

//     });
//     const html = Image.generateHTML(stats, {
//         alt: "Carla profile", // alt text is required!
//         sizes: "100vw",
//         style: "content-visibility:auto", 
//         decoding:"async",
//         loading:"lazy", 
//         class:"kg-image"
//     })

//     console.log(html);
// })();


https://www.11ty.dev/docs/quicktips/inline-js/




module.exports = function(eleventyConfig) {

    // Copy the `img` and `css` folders to the output
    eleventyConfig.addPassthroughCopy('./src/styles/');
    // eleventyConfig.addPassthroughCopy('./src/assets/');
    eleventyConfig.addPassthroughCopy('./src/img/');

    // Add plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    //11ty watches changes to css
    eleventyConfig.addWatchTarget('.scr/styles/style.css');

    // https://11ty.rocks/eleventyjs/dates/
    eleventyConfig.addFilter('postDate', (dateObj) =>{
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    })

    // https://www.11ty.dev/docs/quicktips/inline-js/
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
        code,
        callback
    ) {
    try {
        const minified = await minify(code);
        callback(null, minified.code);
    } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
    }
    })


    return {
        // Control which files Eleventy will process
        // https://www.11ty.dev/docs/config/#default-template-engine-for-html-files
        // templateFormats: ["html", "liquid", "njk"],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",
    
        // These are all optional:

        dir: {
            input: "src",
            includes: "_includes",
            // layouts: "_layouts",
            data: "_data",
            output: "public",
        }
    };
}

