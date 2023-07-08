const base_url = process.env.BASE_URL+"/doc/";
const DocModel=require("../models/DocModel");
module.exports={
    getAllDoctors:async(req,res)=>{
        const alldocs=await DocModel.find({});
        console.log("docs",alldocs)
        return res.render("seedocapp",{
            alldocs,
            base_url
        })
    },
    docform:(req,res)=>{
        res.render("docappform.ejs",{
            base_url
        });
    },
    savedocform:async(req,res)=>{
        const {
            docid,
            avdate,
            sdate,
            edate,
            slot
        }=req.body;
       const olddoc=await DocModel.findOne({docid:docid});
       let newdatetimeobject={
        date:avdate,
        st:sdate,
        et:edate
    }
    if (olddoc) {
        console.log("olddoc", olddoc);
    
        olddoc.date.push(newdatetimeobject); // Push the newdatetimeobject to the date array
    
        olddoc.save()
          .then(() => {
            return res.send({
              status: true,
              message: "Updated successfully"
            });
          })
          .catch((error) => {
            console.log(error);
            return res.send({
              status: false,
              message: "Failed to update"
            });
          });
      }else{
        const newdoc=new DocModel();
        newdoc.date=[newdatetimeobject];
       
        newdoc.slot=slot;
        newdoc.docid=docid;
        newdoc.save().then(()=>{
         return res.send({
             status:true,
             message:"saved successfully"
         })
        })
       }
     
    },
    getdocbyid:async(req,res)=>{
        const doc=await DocModel.findOne({docid:req.params.docid});
        console.log("docs",doc)
        return res.send({
            status:true,
            data:doc,
            base_url
        })
    }
    
}


