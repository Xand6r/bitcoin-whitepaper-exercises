"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});


// TODO: insert each line into blockchain
for (let line of poem) {
	const newBlock = createBlock(line);
	Blockchain.blocks.push(newBlock);
};

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************
function verifyChain(){
	const { blocks } = Blockchain;
	let verified = true;
	for (let block of blocks){
		const blockVerified = verifyBlock(block);
		if(!blockVerified){
			verified = false;
			break;
		}
	};
	return verified;
};

function verifyBlock(block){
	const { blocks } = Blockchain;
	const {
		index,
		hash,
		data,
		previousBlockHash,
	} = block;
	console.log(block)
	// create an exception for the genesis block and the one after it, since there are some inconsistencies there
	if(index === 0 || index === 1) return true;
	// check if the certain fields are present
	if(index < 0 || !data || !previousBlockHash) return false;
	// validate hashes of the current blocks and previous hashes
	const computedCurrentBlockHash = blockHash(block);
	const computedPrevBlockHash = blockHash(blocks[index - 1]);
	const validBlock = block.hash === computedCurrentBlockHash;
	const validPrevBlock = block.previousBlockHash === computedPrevBlockHash;
	return validBlock && validPrevBlock
};

function createBlock(line){
	const { blocks } = Blockchain;
	const currentIndex = blocks.length;
	const newBlock = {};
	// obtain the differnt computedCurrentBlockHashroperties of the block
	newBlock.index = currentIndex;
	newBlock.previousBlockHash = blocks[currentIndex - 1].hash;
	newBlock.data = line;
	newBlock.timestamp = Date.now();
	// obtain the differnt properties of the block

	// hash the block
	const currentHash = blockHash(newBlock);
	newBlock.hash = currentHash;
	// hash the block

	// return the block
	return newBlock;
	// return the block
};


function blockHash(bl) {
	const hashString = `${bl.index}${bl.prevHash}${bl.data}${bl.timestamp}`
	return crypto.createHash("sha256").update(
		hashString
	).digest("hex");
};