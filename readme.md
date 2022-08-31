# How to use this Boilerplate

### Routing

When adding a new page it must be imported to `import.pages.js`
To add routing to this page declare it with the related layout inside the switch inside `router.jsx`
`<layouts.External exact path="/login" component={pages.PageLogin} />`

Routes must be protected to prevent access from unauthorized users. These cases will vary app to app and user to user
Pages that are protected will need a reference `canAccessFunc`. This can be declared either in the return of the Tracker for the page or in the route declaration
`<layouts.External exact path="/login" component={pages.PageAdminUsers} canAccessFunc={MODEL.users.isAdmin}/>`
Some routes do not be to be protected you can either not provide a `canAccessFunc` or you can add the route string to the array `unprotectedRoutes` in `UTILS.ui.js`

### Navigation

To implement Navigation add necessary HTML block below content <div> on the layouts. They will probably differ between Admin and Public routes
React links look something like
`<NavLink className={"navLink"} strict to="/home" activeClassName="selected">
 	<span className="icon icon-home"></span>
 	Home
 </NavLink>`
 				
To programmatically route within a template import Redirect from react-router-dom at top of Component
`import {Redirect} from "react-router-dom";`
Then add the render redirect Function to the Component
`renderRedirect = () => {
 		if(this.state.redirect) {
 			return <Redirect push to={`${this.state.redirect}`}/>
 		}
 	};`
Lastly, add a call to the function as the last element inside the Component <div>
`{this.renderRedirect()}`
Setting the redirect state parameter to the desired route to immediately redirect 
`this.setState({redirect: '/home'});`

### Google Analytics

Do a codebase wide search for Analytics and uncomment the Initialize and Send functions
They are located in the `limitedAccessController` in `UTILS.ui.js` and in `router.jsx`

# Deployment

## Dev Deploy

DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy NEWAPP.dev.meteorapp.com --settings private/settings.dev.json --owner ownerName

meteor build ../builds --server=https://NEWAPP.dev.meteorapp.com --mobile-settings=private/settings.dev.json

## Demo Deploy

DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy NEWAPP.demo.meteorapp.com --settings private/settings.demo.json --owner ownerName

meteor build ../builds --server=https://NEWAPP.demo.meteorapp.com --mobile-settings=private/settings.demo.json

## Production Deploy

DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy NEWAPP.production.meteorapp.com --settings private/settings.production.json --owner ownerName

meteor build ../builds --server=https://NEWAPP.production.meteorapp.com --mobile-settings=private/settings.production.json