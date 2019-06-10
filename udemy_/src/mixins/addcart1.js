export default {
    data(){
        return{
         courses:[]
        }
    },
    methods:{
    addCourse:function(i) {
     if(localStorage.getItem("courses")){
       try {
        this.courses = JSON.parse(localStorage.getItem('courses'));
      } catch(e) {
        localStorage.removeItem('courses');
      }
     var allitems = JSON.parse(localStorage["courses"]);
     for(var j=0;j<allitems.length;j++)
     {
       if(allitems[j].id==i.id){ 
         return
       }
     }}
      var x={
        id: i.id,
        populattopic: i.populartopic,
        author:i.author,
        price:i.price,
      };
      this.courses.push(x);
      this.saveCourses();
    },
    removeCourse:function(x) {
      this.courses.splice(x, 1);
      this.saveCourses();
    },
    saveCourses:function() {
      const parsed = JSON.stringify(this.courses);
      localStorage.setItem('courses', parsed);
    }
    }
}
