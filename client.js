const grpc        = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef  = protoLoader.loadSync("todo.proto", {});
const grpcObject  = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:6333", grpc.credentials.createInsecure());

client.createTodo(
    {
        "id": -1,
        "text": "Do anything"
    },
    (err, res) => {
        console.log("Response from server " + JSON.stringify(res));
    }
);


// client.readTodos(
//     {},
//     (err, res) => {
//         res.items.forEach(i => console.log(i));
//     }
// );


const call = client.readTodosStream();
call.on("data", item => {
    console.log("item from stream server", item);
});

call.on("end", e => {
    console.log("server done");
});

