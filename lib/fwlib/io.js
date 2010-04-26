/* ===========================================================================
	
	File: io.js

	Author - John Dunning
	Copyright - 2010John Dunning.  All rights reserved.
	Email - fw@johndunning.com
	Website - http://johndunning.com/fireworks

	Release - 0.1.0 ($Revision: 1.4 $)
	Last update - $Date: 2010/04/20 19:19:48 $

   ======================================================================== */


/*
	To do:
		- support multiple dojo installations
		
	Done:
		
*/


// ===========================================================================
//  fwlib.dialog
// ===========================================================================

dojo.provide("fwlib.io");
dojo.require("dojo._base.json");


try {

fwlib.io = (function()
{
	var _response = "";
	var _events = {};
	
		// for some reason, we can't use .../dojo/../fwlib/dialog-swfs/ in the
		// path.  runScript just won't run the swf.  so pull the dojo/ off the
		// end and add the direct path to the swfs. 
	var _swfPath = dojo.baseUrl.replace(/dojo\/$/, "") + "fwlib/FWXHR.swf";


	// =======================================================================
	function request(
		inURL,
		inConfig)
	{
			// make sure the response is cleared from the last dialog
		_response = "";

			// add the URL to the config object so we have just one param to
			// pass to the SWF
		inConfig = inConfig || {};
		inConfig.url = inURL;

			// turn the config object into a string that the SWF can access
		fwlib.io._currentRequest = dojo.toJson(inConfig);

		fw.runScript(_swfPath);

		var response = null;
		
			// make sure a _response was set by the dialog.  it may not have if the
			// swf failed for some reason.
		if (_response) {
				// add parens to the string, since it's an object notation and
				// eval will confusingly say "Invalid label" without parens
			response = eval("(" + _response + ")");
//			response = _response;
			_response = "";
		}
		
		return response;
	}


	// =======================================================================
	function _setResponse(
		inResponse)
	{
		_response = inResponse;
	}
	
	
	return {
		request: request,
		_setResponse: _setResponse,
		_currentRequest: ""
	};
})();

} catch (exception) {
	alert([exception, exception.lineNumber, exception.fileName].join("\n"));
}
  