import fs from "fs";
import less from "less";
import CleanCSS from "clean-css";
import { dirname } from "path";
import { rimrafSync } from "rimraf";
import { fileURLToPath } from "url";

const ProjectDirectory = dirname(fileURLToPath(import.meta.url)).replace(
	/\\/g,
	"/"
);
const SourceDirectory = `${ProjectDirectory}/src`;
const DistDirectory = `${ProjectDirectory}/dist`;

if (fs.existsSync(DistDirectory)) {
	rimrafSync(DistDirectory);
}
fs.mkdirSync(DistDirectory);

const BlogLess = fs.readFileSync(`${SourceDirectory}/Blog.less`, "utf-8");
const LessOptions = {
	filename: `${SourceDirectory}/Blog.less`,
	sourceMap: {
		sourceMapFileInline: true,
	},
};
less.render(BlogLess, LessOptions).then((result) => {
	fs.writeFileSync(`${DistDirectory}/Blog.css`, result.css, "utf-8");
	fs.writeFileSync(`${DistDirectory}/Blog.css.map`, result.map, "utf-8");

	const BlogLessMin = new CleanCSS({}).minify(result.css);
	fs.writeFileSync(
		`${DistDirectory}/Blog.min.css`,
		BlogLessMin.styles,
		"utf8"
	);
});
