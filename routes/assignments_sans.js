let Assignment = require('../model/assignment');
let assignmentsData = [
    { id: 1, dateDeRendu: new Date('2024-02-01'), nom: 'Assignment 1', rendu: false, auteur: 'Alice', matiere: 'Math', prof: 'Prof A', note: 0, remarque: '' },
    { id: 2, dateDeRendu: new Date('2024-02-05'), nom: 'Assignment 2', rendu: false, auteur: 'Bob', matiere: 'Science', prof: 'Prof B', note: 0, remarque: '' },
    // ... Add more assignments here
    { id: 10, dateDeRendu: new Date('2024-02-20'), nom: 'Assignment 10', rendu: false, auteur: 'Jean', matiere: 'Histoire', prof: 'Prof J', note: 0, remarque: '' }
];


// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    // assignmentsData.filter((err, assignments) => {
    //     if(err){
    //         res.send(err)
    //     }
    //
    //     res.send(assignments);
    // }
    console.log("je suis dans la fonction getAssignments")
    console.log(assignmentsData)
    res.send(assignmentsData);
    //.json(assignmentsData);
}

// Récupérer un assignment par son id (GET)
// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    let assignment = assignmentsData.find(a => a.id === parseInt(assignmentId));

    if (!assignment) {
        res.status(404).json({ message: 'Assignment not found' });
    } else {
        res.json(assignment);
    }
}


// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.auteur=req.body.auteur;
    assignment.matiere=req.body.matiere;
    assignment.prof=req.body.prof;
    assignment.note=req.body.note;
    assignment.remarque=req.body.remarque;
    console.log("POST assignment reçu :");
    console.log(assignment)
    assignmentsData.push(assignment)
    // assignment.save( (err) => {
    //     if(err){
    //         res.send('cant post assignment ', err);
    //     }
    //     res.json({ message: `${assignment.nom} saved!`})
    // })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({message: 'updated'})
        }

        // console.log('updated ', assignment)
    });

}
// function getAssignmentsPaginate(req,res){
//     var aggregateQuery= Assignment.aggregate();
//     Assignment.aggregatePaginate(aggregateQuery,
//       {
//         page: parseInt(req.query.page) || 1,
//         limit: parseInt(req.query.limit)|| 10,
//       },
//       (err, assignments)=>{
//         if(err){
//           res.send(err);
//         }
//         console.log(assignments);
//         res.send(assignments);
//       }
//       )
//   }
function getAssignmentsPaginate(req,res){
    var aggregateQuery= Assignment.aggregate();
    Assignment.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit)|| 10,
        },
        (err, assignments)=>{
            if(err){
                res.send(err);
            }
            res.send(assignments);
        }
    )
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = {  postAssignment, getAssignment, updateAssignment, deleteAssignment, getAssignmentsPaginate, getAssignments };
