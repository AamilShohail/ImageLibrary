using ImageUpload.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ImageUpload.Controllers
{
    public class GalleryController : ApiController
    {
        [HttpPost]
        [Route("api/UploadImageGallery")]
        public HttpResponseMessage UploadImageGallery()
        {
            string imageName = null;
            var httprequest = HttpContext.Current.Request;

            var postedFile = httprequest.Files["Image"];
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Gallery/" + imageName);
            postedFile.SaveAs(filePath);

            using (ImageGalleryEntities1 db = new ImageGalleryEntities1())
            {
                Image image = new Image()
                {
                    ImageCaption = httprequest["ImageCaption"],
                    ImageName = imageName,
                    Category = httprequest["Category"],

                };
                db.Images.Add(image);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
