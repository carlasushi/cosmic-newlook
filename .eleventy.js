const { DateTime} = require('luxon');
const { minify } = require("terser");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

//  worked ok for img optimization in ./img folder

(async () => {
        let url = "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/342534083_532768988934400_6950276791449197750_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=yCb145URdGMAX89yd8G&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAGI6xo8fcd11y7Iy7KQ2QmfkDKd48oY025ncdgKhdv_w&oe=6482E0CB&_nc_sid=8721cf"
    let stats = await Image(url, {
        formats: ["avif", "jpeg"],
        widths: [600, 1000, 1600, 2400],

    });
    const html = Image.generateHTML(stats, {
        alt: "Alake Shilling show poster", // alt text is required!
        sizes: "100vw",
        style: "content-visibility:auto", 
        decoding:"async",
        loading:"lazy", 
        class:"kg-image"
    })

    console.log(html);
})();


https://www.11ty.dev/docs/quicktips/inline-js/




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

