using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TesteWebApi2.DTOs;
using TesteWebApi2.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TesteWebApi2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class XXAlunoController : ControllerBase
    {
        // GET: api/<AlunoController>
        [HttpGet]
        public ActionResult<IEnumerable<AlunoDTO>> Get()
        {
            return Ok(alunos.Select(x => new AlunoDTO(x)).ToArray());
        }

        // GET api/<AlunoController>/5
        [HttpGet("{id}")]
        public ActionResult<AlunoDTO> GetById(string id)
        {
            var obj = alunos.Where(x => x.Id == id).FirstOrDefault();

            if (obj == null)
                return NotFound();

            return Ok(new AlunoDTO(obj));
        }

        // POST api/<AlunoController>
        [HttpPost]
        public ActionResult<AlunoDTO> Post([FromBody] AlunoDTO objDto)
        {
            var ultimaMatricula = alunos.Max(x => x.Matricula);

            var objNovo = new Aluno();
            objNovo.Id = Guid.NewGuid().ToString();
            objNovo.Matricula = ultimaMatricula + 1;
            objNovo.Nome = objDto.Nome;

            alunos.Add(objNovo);

            return CreatedAtAction(nameof(GetById), new { id = objNovo.Id }, new AlunoDTO(objNovo));
        }

        // PUT api/<AlunoController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] AlunoDTO objDto)
        {
            if (id != objDto.Id)
                return BadRequest();

            var obj = alunos.Where(x => x.Id == id).FirstOrDefault();

            if (obj == null)
                return NotFound();

            obj.Nome = objDto.Nome;
            
            return NoContent();
        }

        // DELETE api/<AlunoController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var obj = alunos.Where(x => x.Id == id).FirstOrDefault();

            if (obj == null)
                return NotFound();

            alunos.Remove(obj);

            return NoContent();
        }

        private static IList<Aluno> alunos = new List<Aluno>
        {
            new Aluno { Id = "A1", Matricula = 123, Nome = "Ana" },
            new Aluno { Id = "A2", Matricula = 124, Nome = "Bruno" },
            new Aluno { Id = "A3", Matricula = 125, Nome = "Carlos" }
        };
    }
}
