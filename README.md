
# Directories 
	- database 				: Modules Database
		+ db.js				: Control Db create, connect

	- modules				: Modules Common
		+ token.js			: Encode/Decode token

	- process				: Modules Process Request
		+ _index.js			: Index Process
		+ login.js			: process Login
		+ user.js			: process user
		+ workspaces.js		: process workspaces

	- server				: Modules http server
		+ _index.js			: Index server
		+ controller.js		: Call to process
		+ req.js			: parse request
		+ res.js			: control respon

	- socket				: Modules socket server
		+ index.js			: Index Socket
	
	- app.js				: Begin APP

	- DB.db					: Sqlite Database 

# for more design pattern see : 
- [sample node](https://github.com/pularbacc/sample-node)

# run 
$ yarn 

$ yarn start 
- if first run , when run yarn start then close and run yarn start again to init db