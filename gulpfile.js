const gulp = require("gulp");
require("./gulp/dev.js");
require("./gulp/prod.js");
require("./gulp/deploy.js");

gulp.task('default', gulp.series(
  "clean:dev",
  gulp.parallel("template:dev", "style:dev", "asset:dev", "script:dev"),
  gulp.parallel("server:dev", "watch:dev")
));

gulp.task('prod', gulp.series(
  "clean:prod",
  gulp.parallel("template:prod", "style:prod", "asset:prod", "script:prod"),
  "server:prod"
));

gulp.task('deploy', gulp.series(
  "clean:deploy",
  gulp.parallel("template:deploy", "style:deploy", "asset:deploy", "script:deploy"),
));