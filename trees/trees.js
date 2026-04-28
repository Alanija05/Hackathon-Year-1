// Nodes will be on levels. One level can hold many nodes. When a child node is to be added, the code checks first if the level exists. Level 0 contains only one node
var current_level_id = 0
var current_node_id = 0
const tree_container = document.getElementById('tree-container')

function check_current_level(){
    var current_level = document.getElementById(String(current_level_id))
    current_level.style.border = '2px red solid'
}

function check_current_node(){
    var current_level = document.getElementById(String(current_level_id));
    var nodes = current_level.getElementsByClassName("node");
    var current_node = nodes[current_node_id];
    current_node.style.border = '2px orange solid';
}



// Functions to go up and down

function go_up(){
    if (current_level_id == 0){
        alert("At root level. Cannot go further up")
        return
    }

    // Set current level back to original style
    var current_level = document.getElementById(String(current_level_id))
    current_level.style.border = '2px pink solid'

    // Set current node back to original style
    var current_node = current_level.getElementsByClassName("node")[current_node_id]
    current_node.style.border = 'none'

    // Set current node id back to 0
    current_node_id = 0

    // Increment current level id
    current_level_id -= 1

    // Set style of new level and new node
    check_current_level()
    check_current_node()
}

function go_down(){
    if (document.getElementById(String(current_level_id+1)) == null){
        alert("At last level. Cannot go further down")
        return
    }

    // Set current level back to original style
    var current_level = document.getElementById(String(current_level_id))
    current_level.style.border = '2px pink solid'

     // Set current node back to original style
    var current_node = current_level.getElementsByClassName("node")[current_node_id]
    current_node.style.border = 'none'

    // Set current node id back to 0
    current_node_id = 0

    // Increment current level id
    current_level_id += 1

    // Set style of new level and new node
    check_current_level()
    check_current_node()
}



// Functions to go right and left

function go_right(){
    var current_level = document.getElementById(String(current_level_id))
    var nodes = current_level.getElementsByClassName("node")

    if (current_node_id >= nodes.length-1){
        alert("At last node. Cannot go further right")
        return
    }

    // Set current node back to original style
    var current_node = nodes[current_node_id]
    current_node.style.border = 'none'

    // Increment current node id
    current_node_id += 1

    // Set style of new node
    check_current_node()
}

function go_left(){
    var current_level = document.getElementById(String(current_level_id))
    var nodes = current_level.getElementsByClassName("node")

    if (current_node_id < 1){
        alert("At first node. Cannot go further left")
        return
    }

    // Set current node back to original style
    var current_node = nodes[current_node_id]
    current_node.style.border = 'none'

    // Increment current node id
    current_node_id -= 1

    // Set style of new node
    check_current_node()
}



// Functions to add nodes and levels

function make_new_level(){
    var next_level = document.createElement('div');
    next_level.setAttribute('class', 'level');
    next_level.setAttribute('id', current_level_id+1);
    
    if (current_level_id == 2){
        next_level.style.width = `${100/current_level_id}vw`;
    } else {
        next_level.style.width = `${100/current_level_id**2}vw`;
    }

    return next_level
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

        // Get all nodes in next level
        var nodes = next_level.getElementsByClassName('node');

        // Check if there are no more than 2 nodes for each parent node
        /*if (nodes.length > 1){
            alert("Max amount of nodes reached for parent node")
            return
        }*/

        // Make new node
        var new_node = make_new_node();

        // Add new node to next level
        next_level.appendChild(new_node);

    } catch (error) {
        // Make next level
        var next_level = make_new_level()

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
        var next_level = document.getElementById(String(current_level_id+1));

        // Delete node
        tree_container.removeChild(next_level);

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
check_current_node()