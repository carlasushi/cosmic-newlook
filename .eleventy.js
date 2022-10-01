const { DateTime} = require('luxon');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
//  worked ok for img optimization in ./img folder

// (async () => {
//         let url = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c3a4a7ea-aa82-42a1-9a11-5ce36df735f2/Frame_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221001%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221001T053255Z&X-Amz-Expires=86400&X-Amz-Signature=5e96ed5d33993779757827011ec265aa36820e9f1ba5943772a48efbf7e37476&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Frame%25203.jpg%22&x-id=GetObject"
//     let stats = await Image(url, {
//         formats: ["avif", "jpeg"],
//         widths: [600, 1000, 1600, 2400],

//     });
//     const html = Image.generateHTML(stats, {
//         alt: "Tamalpais mugs on shelves", // alt text is required!
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

