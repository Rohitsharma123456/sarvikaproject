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
        const olddateexists = olddoc.date?.find(e => {
            const eDate = new Date(e.date);
            const inputDate = new Date(avdate);
            return eDate.toISOString() === inputDate.toISOString();
          });
       

          if (olddateexists) {
            console.log("olddateexists", olddateexists);
            // Update the st and et values in olddateexists
            olddateexists.st = sdate;
            olddateexists.et = edate;
          } else {
            olddoc.date.push(newdatetimeobject);
          }
      
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


