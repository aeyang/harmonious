module.exports = function(grunt) {

  // 1.] Project and Task Configuration
  grunt.initConfig({

    jsDir:   'public/javascripts',
    cssDir:  'public/stylesheets',
    sassDir: 'public/sass/stylesheets',
    pkg:      grunt.file.readJSON('package.json'),

    //Config for watch task
    watch: {
      css: {
        files: '<%=sassDir%>' + '/*.scss',
        tasks: 'compass',
        options: {
          livereload: true
        }
      }
    },

    // Config for compass task
    compass: {
      dist: {
        options: {
          sassDir: '<%=sassDir%>',
          cssDir: '<%=cssDir%>',
          environment: 'production',
          require: 'ninesixty'
        }
      },
      dev: {
        options: {
          sassDir: '<%=sassDir%>',
          cssDir: '<%=cssDir%>',
          environment: 'development',
          require: 'ninesixty'
        }
      }
    }
  });

  // 2.] Loading Grunt plugins and tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 3.] Default Tasks
  grunt.registerTask('default', ['watch']);
};