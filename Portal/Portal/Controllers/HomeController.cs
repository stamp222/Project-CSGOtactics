using Portal.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portal.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        [Authorize]
        [HttpGet]
        public ActionResult Index()
        {
            
            return View();
        }

        [HttpPost]
        public ActionResult Index(Image imageModel)
        {
            bool Status = false;
            string fileName = Path.GetFileNameWithoutExtension(imageModel.ImageFile.FileName);
            string extension = Path.GetExtension(imageModel.ImageFile.FileName);
            fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;
            imageModel.ImagePath = "~/Image/" + fileName;
            fileName = Path.Combine(Server.MapPath("~/Image/"), fileName);
            imageModel.ImageFile.SaveAs(fileName);
            using (MyDatabaseEntities3 db = new MyDatabaseEntities3())
            {

                db.Images.Add(imageModel);
                db.SaveChanges();
            }
            ViewBag.Status = Status;
            ModelState.Clear();
            return View();
        }

        [HttpGet]
        public ActionResult View (int id)
        {
            Image imageModel = new Image();

            using (MyDatabaseEntities3 db = new MyDatabaseEntities3())
            {
                imageModel = db.Images.Where(x => x.ImageID == id).FirstOrDefault();
            }
            return View(imageModel);
        }
    }
}