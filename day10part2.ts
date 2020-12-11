const input = `126
38
162
123
137
97
92
67
136
37
146
2
139
74
101
163
128
127
13
111
30
117
3
93
29
152
80
21
7
54
69
40
48
104
110
142
57
116
31
70
28
151
108
20
157
121
47
75
94
39
73
77
129
41
24
44
132
87
114
58
64
4
10
19
138
45
76
147
59
155
156
83
118
109
107
160
61
91
102
115
68
150
34
16
27
135
161
46
122
90
1
164
100
103
84
145
51
60`;

const joltageAdapters = input.split("\n").map(string => Number(string));
const sortedAdapters = joltageAdapters.sort((a, b) => a - b);
const largestAdapter = joltageAdapters[joltageAdapters.length - 1];

sortedAdapters.unshift(0); // connect the charging outlet
sortedAdapters.push(largestAdapter + 3); // connect the charging outlet

const cache = sortedAdapters.map(() => null);
const combinations = findPossibleWays(0, sortedAdapters, cache);

console.log(combinations);

function findPossibleWays(index, sortedJoltages, cachedAccumulations) {
    if (index === sortedAdapters.length - 1) {
        return 1;
    }

    if (cachedAccumulations[index] === null) {
        cachedAccumulations[index] = [1, 2, 3]
            .filter(joltageIncrease => sortedJoltages[index + joltageIncrease] <= sortedJoltages[index] + 3)
            .map(joltageIncrease => findPossibleWays(index + joltageIncrease, sortedJoltages, cachedAccumulations))
            .reduce((finalAccumulation, currentAccumulation) => finalAccumulation + currentAccumulation, 0);
    }

    return cachedAccumulations[index];
}
