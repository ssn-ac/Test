using System.Web;
using System.Web.Optimization;

namespace Technical.Test.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/public/scripts")
                   .Include(

                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery.validate.js",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/underscore.js",
                        "~/Scripts/underscore.string.js",
                        "~/Scripts/backbone.js",
                        "~/Scripts/backbone.marionette.js",
                        "~/Scripts/backbone.computed.js",
                        "~/Scripts/backbone.cocktail.js",
                        "~/Scripts/backbone.syphon.js",
                        "~/Scripts/hogan.template.js",
                        "~/Scripts/hogan.compiler.js",
                        "~/Scripts/toastr.js",
                        "~/app/techtest.js")
                   .IncludeDirectory("~/app/config/base", "*.js")
                   .IncludeDirectory("~/app/config/extensions", "*.js")
                   .IncludeDirectory("~/app/config/extensions/javascript", "*.js")
                   .IncludeDirectory("~/app/config/mixins/views", "*.js")
                   .IncludeDirectory("~/app/config/utilities", "*.js")
                   .IncludeDirectory("~/app/config/views", "*.js")
                   .IncludeDirectory("~/app/common/loading", "*.js")
                   .IncludeDirectory("~/app/components/people", "*.js")
                   .IncludeDirectory("~/app/components/people/edit", "*.js")
                   .IncludeDirectory("~/app/components/people/list", "*.js"));


            bundles.Add(new StyleBundle("~/public/styles").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/toastr.css",
                      "~/Content/Site.css"));
        }
    }
}
