import JudgesService from "../services/judges.js";

function getAllJudges(req, res) {
  JudgesService.getAllJudges(req.query)
    .then(function (judges) {
      res.status(200).json(judges);
    })
    .catch(function (err) {
      res.status(404).json({ 
        message: `Ocurrio un error en la carga de los jueces`, 
        error: err 
      });
    });
}

function getJudgeById(req, res) {
  const { idJudge } = req.params;

  JudgesService.getJudgeById(idJudge)
    .then(function (judge) {
      return res.status(200).json(judge);
    })
    .catch(function (err) {
      res.status(404).json({ 
        message: `No se encuentra el juez #${idJudge}`, 
        error: err 
      });
    });
}

export default { 
    getAllJudges,
    getJudgeById
};