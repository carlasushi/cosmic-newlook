const { DateTime} = require('luxon');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
//  worked ok for img optimization in ./img folder

// (async () => {
//     let url = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/436347f8-d739-496e-8e8f-2db2c785a34c/rust_yunomi_collage.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220929T201329Z&X-Amz-Expires=86400&X-Amz-Signature=ead68feaa5942894b3a46e4a2d0312b2d0b7dc8693fc688b3b017ad858c56296&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22rust%2520yunomi%2520collage.jpg%22&x-id=GetObject";
//     let stats = await Image(url, {
//         formats: ["avif", "jpeg"],
//         widths: [600, 1000, 1600, 2400],
//     });
//     const html = Image.generateHTML(stats, {
//         alt: "Rust Yunomi", // alt text is required!
//         sizes: "100vw",
//         style: "content-visibility:auto", 
//         decoding:"async",
//         loading:"lazy", 
//         class:"kg-image"
//     })

//     console.log(html);
// })();


module.exports = function(eleventyConfig) {

    // Copy the `img` and `css` folders to the output
    eleventyConfig.addPassthroughCopy('./src/styles/');
    eleventyConfig.addPassthroughCopy('./src/assets/');
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
            data: "_data",
            output: "public",
        }
    };
}

