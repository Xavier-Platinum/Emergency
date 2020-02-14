module.exports = {
  dashboard: (req, res) => {
    let pageTitle = "Dashboard";
    let pageHeading = "Admin";
    res.render("dashboard", { pageHeading, pageTitle });
  },
  users: (req, res) => {
    let pageTitle = "Users";
    let pageHeading = "Users";
    res.render("users", { pageHeading, pageTitle });
  },
  units: (req, res) => {
    let pageTitle = "Emergency Units";
    let pageHeading = "Emergency Units";
    res.render("units", { pageHeading, pageTitle })
  },
  agencies: (req,res) => {
    let pageTitle = "Agencies";
    let pageHeading = "Agencies";
    res.render("agencies", { pageTitle, pageHeading })
  },
  location: (req,res) => {
    let pageTitle = "Location";
    let pageHeading = "Location";
    res.render("location", { pageTitle, pageHeading }) 
  },
};
