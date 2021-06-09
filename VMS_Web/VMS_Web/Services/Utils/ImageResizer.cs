using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace VMS_Web.Services.Utils
{
    public static class ImageResizer
    {
        private const decimal ImageMaxSize = 600;
        
        public static async Task<string> ResizeImage(string imagePath)
        {
            if (!FileSaver.IsImage(imagePath))
                return imagePath;
            
            var fileName = imagePath.Split("/").Last();
            var fileExtension = fileName.Split(".").Last();
            var resizedFileName = fileName.Replace($".{fileExtension}", $"resized.{fileExtension}");
            var resizedPath = imagePath.Replace($".{fileExtension}", $"resized.{fileExtension}");
            
            try
            {
                using var image = await Image.LoadAsync(imagePath);
                int resizedImageWidth = image.Width;
                int resizedImageHeight = image.Height;
                if (resizedImageWidth > ImageMaxSize || resizedImageHeight > ImageMaxSize)
                {
                    var divider = Math.Max(resizedImageWidth, resizedImageHeight) / ImageMaxSize;
                    resizedImageWidth = decimal.ToInt32(Math.Floor(resizedImageWidth / divider));
                    resizedImageHeight = decimal.ToInt32(Math.Floor(resizedImageHeight / divider));
                }
                else
                {
                    return imagePath;
                }

                image.Mutate(x => x.Resize(resizedImageWidth, resizedImageHeight));
                await image.SaveAsync(resizedPath);
                
                // delete original image
                File.Delete(imagePath);

                return resizedFileName;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}