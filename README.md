# Web reader

This is a web-app that mimics the view mode of PDF readers.

Features -
- Responsive website
- Sidebar toggling support
- Breadcrumbs containing the section and sub-section
- Both the sidebar and the breadcrumbs are dynamically updated as a user scrolls (using the [Intersection Obserview API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API))
- The data-source is currently a static entry set to a specific data-model. Can be easily fetched from an API with the given model
- Internal links navigate correctly, with the sidebar and breadcrumbs working accordingly.
- Built and tested on Chrome and Safari

Hosted on heroku [here](https://peaceful-chamber-19526.herokuapp.com/)

This project was built with - 
- React (Create React App)
- Bootstrap 
- Fontawesome
- Heroku