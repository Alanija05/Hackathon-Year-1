// Nodes will be on levels. One level can hold many nodes. When a child node is to be added, the code checks first if the level exists. Level 0 contains only one node
var current_level_id = 0
const tree_container = document.getElementById('tree-container')

function check_current_level(){
    var current_level = document.getElementById(String(current_level_id))
    current_level.style.border = '2px red solid'
}

function go_up(){
    if (current_level_id == 0){
        alert("At root level. Cannot go further up")
        return
    }

    // Set current level back to original style
    var current_level = document.getElementById(String(current_level_id))
    current_level.style.border = '2px pink solid'

    // Increment current level id
    current_level_id -= 1

    // Set style of new level
    check_current_level()
}

function go_down(){
    if (document.getElementById(String(current_level_id+1)) == null){
        alert("At last level. Cannot go further down")
        return
    }

    // Set current level back to original style
    var current_level = document.getElementById(String(current_level_id))
    current_level.style.border = '2px pink solid'

    // Increment current level id
    current_level_id += 1

    // Set style of new level
    check_current_level()
}

function make_new_node(){
    var new_node = document.createElement('div');
    new_node.setAttribute('class', 'node');
    return new_node;
}

function add_node(){
    try{
        // Find next level
        var next_level = document.getElementById(String(current_level_id+1));

        // Make new node
        var new_node = make_new_node();

        // Add new node to next level
        next_level.appendChild(new_node);

    } catch (error) {
        // Make next level
        var next_level = document.createElement('div');
        next_level.setAttribute('class', 'level');
        next_level.setAttribute('id', current_level_id+1);

        // Add next level to tree container
        tree_container.appendChild(next_level);

        // Make new node
        var new_node = make_new_node();

        // Add new node to next level
        next_level.appendChild(new_node);
    }
}

function delete_level_below(){
    try{
        // Find next level (one to delete)
        var parent_containter = document.getElementById('tree-container');
        var next_level = document.getElementById(String(current_level_id+1));

        // Delete node
        parent_containter.removeChild(next_level);

    } catch (error){
        alert("No level found to delete");
    }
}

function delete_node(){
    try{
        // Find next level
        var next_level = document.getElementById(String(current_level_id+1));

        // Find a node to delete
        var nodes = next_level.getElementsByClassName('node');
        var node_to_delete = nodes[0];

        // Delete node
        next_level.removeChild(node_to_delete);

        if (nodes.length < 1){
            delete_level_below();
        }

    } catch (error){
        alert("No node found to delete")
    }
}

check_current_level()