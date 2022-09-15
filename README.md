# bitroot_backend_test
  //to get all contact
  
   method- GET;
   url -  / 
 
 //to create a contact
 method- POST
 url -  /create-contact
 
  keys
 
 name: string 
 phone: string 
 
 image:file
 

===============================================
 //to delete a contact
 method- DELETE
 url -  /delete
 
 keys
 
 Query Params - 
 id:id of contact
===============================================
 //to search a contact
 method- GET
 url -  /search
 
  keys
 
 Query Params -
  value : searvh value
  
  ===============================================
   
 //to update a contact
 method- PATCH
 url -  /update-contact
 
  Query Params -
  id :id of the contact
 
  keys
 
 name: string 
 phone: string 
 
 image:file
 
  
  
  
  
  
  
