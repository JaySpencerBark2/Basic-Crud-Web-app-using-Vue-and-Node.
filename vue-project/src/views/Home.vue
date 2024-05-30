<template>
    <v-app>
      <updatePopup  ref = "updatePopup"/>
      <v-data-table
        :headers = "headerTable"
        
        :items = "jsonData"
      >
      <template v-slot:item.button="{item}" >
        <v-btn
          size="small"
          color="red"
          @click = "deletEntrie(item);"  
        >
          Delete
        </v-btn>
        
        <v-btn
        size="small"
        color="primary"
        @click ="updateEntire(item)"
        >
          Update
        </v-btn> 
  
      </template>
    </v-data-table>
    <div class="d-flex justify-center align-center h-100">
    <Popup  />
    </div>
    </v-app>
  </template>
  
  <script>
  
  
  import Popup from '@/components/popup.vue';
  import updatePopup from '@/components/popupModal.vue';
  export default{
    components:{
      Popup,
      updatePopup,
    },
  
  
    data(){
      return{
        jsonData: [],
        headerTable: [{ title: "First name", key: "firstname" }, 
        { title: "Last name", key: "lastname" }, 
        { title: "Email", key: "email" }, { title: "Button", key: "button" } ],
        drawer: null,
      };
    },
  
  methods:{
    async getRequest(){
     const res = await fetch("http://localhost:3000/route2/route3",{
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type" : "application/json",
      },
     })
     const data = await res.json()
     //console.log(data);
     this.jsonData = data;
     console.log(this.jsonData);
    },
  
    async deletEntrie(item){
  
      try{
        console.log("delete", item);
        const response = await fetch("http://localhost:3000/route1/delete",{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({item}),
        })
        if(response.ok)
          window.location.reload();
  
      } catch (error){
        console.log(error);
      }   
    },
  
  
    async updateEntire(item){
      this.$refs.updatePopup.openPopup(item);
      console.log("updateitem", item);
    }
  },
  async mounted(){
    await this.getRequest();
    }
  }
  </script>
  
  
  