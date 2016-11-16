import React, { Component } from 'react'

export default class Instructions extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <h2>Instructions</h2>
              <p>Sorting: click on the arrows inside the table headers to sort ascending or descending by that field.</p>
              <p>Searching: Enter a search term, select the field to search within, then click "Search". To cancel the search, empty the search field then click "Search" again.</p>
              <p>Deleting: Simply click the delete button.</p>
              <p>Editing: Click the edit button next to a player, edit fields, and click "Update".</p>
              <p>Creating: Click the "Create New Player" button, enter all appropriate fields, then click "Create".</p>
              <h3>Fields</h3>
              <p>Position: may be `O` (outfield), `I` (infield), `C` (catcher), or `P` (pitcher).</p>
              <p>Hands: may be `L` (left), `R` (right), or `S` (switch).</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
