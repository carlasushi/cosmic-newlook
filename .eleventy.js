const { DateTime} = require('luxon');
const { minify } = require("terser");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

//  worked ok for img optimization in ./img folder

// (async () => {
//         let url = "https://file.notion.so/f/f/aa01f6be-9697-4f4f-a7ad-555584313cde/90a21883-2855-44ef-a674-8f4a2f2c56bd/fugu.jpg?id=61a6ac20-a8ca-4104-b99d-8630507fedd0&table=block&spaceId=aa01f6be-9697-4f4f-a7ad-555584313cde&expirationTimestamp=1702281600000&signature=tLokwsawVTuNHOLAVvt8DQ2l9XSM3-lUDw6IZjm-Omk&downloadName=fugu.jpg"
//     let stats = await Image(url, {
//         formats: ["avif", "jpeg"],
//         widths: [600, 1000, 1600, 2400],

//     });
//     const html = Image.generateHTML(stats, {
//         alt: "Fugu Planter", // alt text is required!
//         sizes: "100vw",
//         style: "content-visibility:auto",
//         decoding:"async",
//         loading:"lazy",
//         class:"kg-image"
//     })

//     console.log(html);
// })();


// https://www.11ty.dev/docs/quicktips/inline-js/




module.exports = function(eleventyConfig) {

    // favicon
    eleventyConfig.addPassthroughCopy({ "img/favicon": "/" });

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
