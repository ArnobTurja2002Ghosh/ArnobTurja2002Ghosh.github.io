///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////
//
//  Assignment       COMP3200 - Assignment 4
//  Professor:       David Churchill
//  Year / Term:     2023-09
//  File Name:       GASettings.js
// 
//  Student Name:    Arnob Ghosh
//  Student User:    arnobg
//  Student Email:   arnobg@mun.ca
//  Student ID:      202136073
//  Group Member(s): [enter student name(s)]
//
///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////


class GASettings {

    constructor (sudokuSize) {
        
        this.fitnessFunction = FitnessFunction2 //SudokuFitness;
        this.individualSize = sudokuSize;
        this.populationSize = 100;
        this.elitismRatio = 0.01;
        this.mutationRate = 0.2;
        this.randomRatio = 0.5;
        this.individualValues = [];
        for(let i=0; i<26; i++){this.individualValues.push(65+i);}
        for(let i=0; i<26; i++){this.individualValues.push(97+i);}
        
    }
       
    getRandomGeneValue = function () {
        return this.individualValues[Math.floor(Math.random() * this.individualValues.length)];
    }
}
function FitnessFunction2(array){
    let s1 = [[65, 97], [82, 114], [78, 110], [79, 111], [66, 98]];
    let fitness=0;
    for (let c = 0; c < array.length; c++) {
        if(Math.abs(array[c]-s1[c][0]) < Math.abs(array[c]-s1[c][1])){
            fitness+=1/(1+Math.abs(s1[c][0] -array[c]));
        }
        else if(Math.abs(array[c]-s1[c][0]) > Math.abs(array[c]-s1[c][1])){
            fitness+=1/(1+Math.abs(s1[c][1] -array[c]));
        }
    }
    return fitness;
}
function SumFitness(array) {
    let size = Math.sqrt(array.length);
    let s = new Sudoku(size);
    let s1=[65, 82, 78, 79, 66];
    s.setArray(array);
    let fitness = 0;
    
    for (let c = 0; c < array.length; c++) {
        fitness += 1/(1+Math.abs(s1[c]-array[c]));
    }
    
    return fitness;
}

function CheckerFitness(array) {
    let size = Math.sqrt(array.length);
    let s = new Sudoku(size);
    let s1=[97, 114, 110, 111, 98];
    s.setArray(array);
    let fitness = 0;
    
    for (let c = 0; c < array.length; c++) {
        fitness += 1/(1+Math.abs(s1[c]-array[c]));
    }
    
    return fitness;
}

function MatchRowFitness(array) {
    let sum = 0;
    let size = Math.sqrt(array.length);
    for (let i=0; i < array.length; i++) {
        let row = Math.floor(i / size) + 1;
        if (array[i] == row) {
            sum = sum + 1;
        }
    }
    return sum;
}

function MatchColFitness(array) {
    let sum = 0;
    let size = Math.sqrt(array.length);
    for (let i=0; i < array.length; i++) {
        let col = (i % size) + 1;
        if (array[i] == col) {
            sum = sum + 1;
        }
    }
    return sum;
}




// Copyright (C) David Churchill - All Rights Reserved
// COMP3200 - 2023-09 - Assignment 4
// Written by David Churchill (dave.churchill@gmail.com)
// Unauthorized copying of these files are strictly prohibited
// Distributed only for course work at Memorial University
// If you see this file online please contact email above
