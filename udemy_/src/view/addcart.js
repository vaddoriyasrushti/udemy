 export default {
    data(){
        return{
         courses:[]
        }
    },
    methods:{
    addCourse(i) {
      var user=localStorage.getItem("user")
      var courses=localStorage.getItem("courses")
      if(user){
        let data={
                          "userid":user.userid,
                          "catid":i.id
                        }
                this.$store.dispatch('cart',data)
      }
      else{
        if(courses){
          try {
            this.courses = JSON.parse(courses);
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
      }
    },
    removeCourse(x) {
      this.courses.splice(x, 1);
      this.saveCourses();
    },
    saveCourses() {
      const parsed = JSON.stringify(this.courses);
      localStorage.setItem('courses', parsed);
    }
    }
};

