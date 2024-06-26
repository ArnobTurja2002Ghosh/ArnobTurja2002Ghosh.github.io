///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////
//
//  Assignment       COMP3200 - Assignment 4
//  Professor:       David Churchill
//  Year / Term:     2023-09
//  File Name:       GA_Student.js
// 
//  Student Name:    Arnob Ghosh
//  Student User:    arnobg
//  Student Email:   arnobg@mun.ca
//  Student ID:      202136073
//  Group Member(s): [enter student name(s)]
//
///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////

// Note: population is an array of JavaScript objects containing two variables
//       { gene: [array of integer values], fitness: number }
//       - population[i].gene    = 1D array representation of the individual (genotype)
//       - population[i].fitness = fitness of the invidivual (calculated when added to population)
//
function GAEvolve(population, settings) {

    // 1. Set up a new array which will hold the next population
    let nextPopulation = [];
    population.sort(function(a, b){return b.fitness - a.fitness});
    let numElite = settings.populationSize * settings.elitismRatio;
    for(let i=0; i<numElite; i++){
        nextPopulation.push(population[i]);
    }
    let numRandom = settings.populationSize * settings.randomRatio;
    for(let i=0; i<numRandom; i++){
        let newGene = [];
        for(let j=0; j<settings.individualSize; j++){
            newGene.push(settings.getRandomGeneValue())
        }
        nextPopulation.push({ gene: newGene, fitness: settings.fitnessFunction(newGene) });
    }
    let fitnessSum =0;
    for(let i=0; i<settings.populationSize; i++){
        fitnessSum+=population[i].fitness;
    }
    //console.log(fitnessSum);
    while (nextPopulation.length < settings.populationSize){
        let parent1 = RouletteWheelSelection(population, fitnessSum);
        let parent2 = RouletteWheelSelection(population, fitnessSum);
        
        let child1  = CrossOver(parent1, parent2, settings);
        let child2  = CrossOver(parent2, parent1, settings);
        MutateIndividual(child1, settings);
        MutateIndividual(child2, settings);
    //
    //       Add the children to the population
        nextPopulation.push(child1);
        if(nextPopulation.length<settings.populationSize){
            nextPopulation.push(child2);
        }
    //       Be careful not to add child2 if it would go above the population size
    }
    if(nextPopulation.length!=settings.populationSize){
        console.log("Something is wrong here");
    }
    // the nextPopulation array should always be the same length as settings.populationSize
    // IMPORTANT: Change this to return nextPopulation
    return nextPopulation;
}

// Student TODO: Write this function
//
// Select a parent individual from a population based on roulette wheel selection
function RouletteWheelSelection(population, fitnessSum) {
    let pick = Math.random()*fitnessSum;
    let selectedIndex = 0; // use the algorithm from the slides
    let current =0;
    for(let i=0; i<population.length; i++){
        current+=population[i].fitness;
        if(current>pick) {return population[i];}
    }
}


function CrossOver(parent1, parent2, settings) {

    let childGene = parent1.gene.slice(0, settings.individualSize/2).concat(parent2.gene.slice(settings.individualSize/2, settings.individualSize));
    // add the first half of parent1 gene to childGene
    // add the second half of parent2 gene to childGene
    // NOTE: the size of the child gene must equal the size of the parent gene
    //       be very careful of this when parent size is odd and there's not exact half
    //       choose 1 left or 1 right of the midpoint, it doesn't matter
    if(childGene.length != settings.individualSize){console.log("Something wrong here");}
    return { gene: childGene, fitness: settings.fitnessFunction(childGene) };
}


function MutateIndividual(individual, settings) {
    if(Math.random()>=settings.mutationRate){return;}
    individual.gene[Math.floor(Math.random()*settings.individualSize)] = settings.getRandomGeneValue();
    individual.fitness = settings.fitnessFunction(individual.gene);
}

// Although convention is to provide explanation above the function, to keep the codes closer to each other for better readability,
// justification of this code is written below this function.
function SudokuFitness(array) {
    let size = Math.sqrt(array.length);
    let s = new Sudoku(size);
    let s1=[65, 114, 110, 111, 98];
    s.setArray(array);
    let fitness = 0;
    
    for (let c = 0; c < array.length; c++) {
        fitness += 1/(1+Math.abs(s1[c]-array[c]));
    }
    
    return fitness;
}

// Comparison between the new and older SudokuFitness to justify the new function

// Scenario 1: A 3*3 Sudoku is row-wise and square-wise perfect - only one of the columns has a value twice
// The older function will give a fitness of 81*2+9*8+8 = 242
// The newer function will give a fitness of 81-2 +1/2 +1/2 = 80

// Scenario 2: A 3*3 Sudoku is row-wise and square-wise perfect - only two of the columns have an issue - each has a value twice
// The older function will give a fitness of 81*2+9*7+16 = 241
// The newer function will give a fitness of 81-4 +1/2 +1/2 +1/2 +1/2 = 79

// Scenario 3: A 3*3 Sudoku is row-wise and square-wise perfect but column has a repeating value.
// The older function will give a fitness of 234
// The newer function will give a fitness of 71

// Both functions seem linear with a gradient of 1 - how is the new function justified?
// It is because of the different ranges of the two functions
// When the range is small, a small change as small as by 1 can cause a huge percentage change
// For example, in Scenario 2, the older fitness function says that the Sudoku is 99.1% solved, while the new function says that the Sudoku is 97.5% solved.
// Repeating this percentage calculation for different scenarios will show that the newer function puts a bigger selection pressure during Roulette Selection.
// Could I not do better? Could I not increase the selection pressure further by... let's say squaring the new fitness function?
// Two reasons:
// 1) If I really had to square, I could simply square the older fitness function and call it my new fitness function. Less work, but since professor said to try something different,
// it would be a lame trick from my side to use cubic, quadratic or any polynomial or exponential of the old function to create a new function just because squaring is not allowed from the professor.
// I have accepted the challenge of of not using any (**) operator at all. 
// 2) I think a large range of numbers for the range of a function, where most of the numbers are not even being used, is a sign of a bad function.
// It will be hard to justify this thought but if we think intuitively, if we square the old function, we will be dealing with numbers as large as 59049 as a fitness of an individual while dealing with less than 200 discrete (square) integers.


// Copyright (C) David Churchill - All Rights Reserved
// COMP3200 - 2023-09 - Assignment 4
// Written by David Churchill (dave.churchill@gmail.com)
// Unauthorized copying of these files are strictly prohibited
// Distributed only for course work at Memorial University
// If you see this file online please contact email above
