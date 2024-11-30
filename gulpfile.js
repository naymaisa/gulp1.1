//carrega a funcionalidade do gulp para o codigo
const gulp = require('gulp');
//importa o pacote, é uma integraçao entre gulp e o sass. utiliza o sass para transformar arquivos scss em .css
const sass = require('gulp-sass')(require('sass'));
//importa o modulo que permite gerar mapas de origem para arquivos css ou js
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify')



function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}

//importante para comprimir as imagens para nao comprometer a internet do usuario, diminui as img
function comprimeImagens() {
    return gulp.src('./source/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}


//compilaçao sass com o gulp e compressao do arquivo
function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}



exports.default = function () {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/**/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
}
exports.javascript = comprimeJavaScript;
