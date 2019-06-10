<template>
<div>
  <br>
    <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
  <br>
  <categories></categories> 
</div>
</template>
<script>
import categories from '../view/categories'
export default {
    data(){
        return{
           items: [
          {
            src: 'https://i.udemycdn.com/notices/home_banner/image/048e0cdc-3e71-47dc-ae30-e9ac7a3504b5.jpg'
          },
          {
            src: 'https://i.udemycdn.com/notices/home_banner/image/6d42ee43-f242-4e4d-9d76-40d8c1e379f6.jpg'
          },
          {
            src: 'https://i.udemycdn.com/notices/home_banner/image/048e0cdc-3e71-47dc-ae30-e9ac7a3504b5.jpg'
          },
          {
            src: 'https://i.udemycdn.com/notices/home_banner/image/58758764-c555-4b7c-a461-3f74edd7c969.jpg'
          }
        ]
        }
    },
    components:{
      'categories':categories
    },
}
</script>

<style>

</style>



    