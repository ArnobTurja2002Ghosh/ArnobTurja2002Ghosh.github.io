///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////
//
//  Assignment       COMP3200 - Assignment 4
//  Professor:       David Churchill
//  Year / Term:     2023-09
//  File Name:       Sudoku.js
// 
//  Student Name:    Arnob Ghosh
//  Student User:    arnobg
//  Student Email:   arnobg@mun.ca
//  Student ID:      202136073
//  Group Member(s): [enter student name(s)]
//
///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////

class Sudoku {
    
    constructor(size) {
        this.size = size;
        this.sqSize = Math.sqrt(size);
        this.board = [];
        for (var i=0; i<size; i++) { this.board[i] = 0; }
    }
    
    getIndex(row, col) {
        return this.size * row + col;        
    }

    randomize() {
        for (var i=0; i<this.size; i++) { 
            this.board[i] = [65, 66, 78, 79, 82][Math.floor(Math.random() * this.size)]; 
        }
    }

    set(row, col, val) {
        this.board[this.getIndex(row, col)] = val;       
    }

    get(row, col) {
        return this.board[this.getIndex(row, col)];
    }

    numConflicts(row, col) {
        let sum = 0;
        // get the row conflicts
        for (let c=0; c<this.size; c++) {
            if (c != col && (this.get(row,c) == this.get(row,col))) {
                sum++;
                break;
            }
        }
        // get the column conflicts
        // for (let r=0; r<this.size; r++) {
        //     if (r != row && (this.get(r,col) == this.get(row,col))) {
        //         sum++;
        //         break;
        //     }
        // }

        // let sr = Math.floor(row / this.sqSize) * this.sqSize;
        // let sc = Math.floor(col / this.sqSize) * this.sqSize;
        // for (let dr=0; dr<this.sqSize; dr++) {
        //     for (let dc=0; dc<this.sqSize; dc++) {
        //         let r = sr + dr;
        //         let c = sc + dc;
        //         if (r != row && c != col && (this.get(r,c) == this.get(row,col))) {
        //             sum++;
        //             break;
        //         }
        //     }
        // }
       
        return sum;
    }

    setArray(array) {
        this.board = array;
        this.size = array.length;
        this.sqSize = Math.sqrt(this.size);
    }
}

s1=new Sudoku(5);
s1.setArray(79, 78, 65, 65, 82);
for(let i=0; i<5; i++){
console.log(s1.numConflicts(0, i));
}// Copyright (C) David Churchill - All Rights Reserved
// COMP3200 - 2023-09 - Assignment 4
// Written by David Churchill (dave.churchill@gmail.com)
// Unauthorized copying of these files are strictly prohibited
// Distributed only for course work at Memorial University
// If you see this file online please contact email above
