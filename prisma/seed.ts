import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.resource.deleteMany();
  await prisma.task.deleteMany();
  await prisma.day.deleteMany();
  await prisma.week.deleteMany();
  await prisma.sprint.deleteMany();

  // Create Sprint
  const startDate = new Date('2025-01-01');
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 56); // 8 weeks = 56 days

  const sprint = await prisma.sprint.create({
    data: {
      title: 'Interview Preparation Sprint',
      description: 'An 8-week intensive program to improve skills and get interview ready',
      startDate,
      endDate,
    },
  });

  // 8-week plan data
  const weeksData = [
    {
      weekNumber: 1,
      title: 'Foundations & Data Structures',
      goals: JSON.stringify([
        'Master Arrays and Strings',
        'Understand Big O notation',
        'Practice 10 LeetCode Easy problems',
      ]),
      days: [
        {
          tasks: ['Review Arrays basics', 'Solve Two Sum problem', 'Practice string manipulation'],
          resources: [
            { title: 'Arrays Introduction', url: 'https://leetcode.com/explore/learn/card/array-and-string/', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Learn Hash Maps', 'Solve Valid Anagram', 'Study time complexity'],
          resources: [
            { title: 'Hash Table Guide', url: 'https://leetcode.com/explore/learn/card/hash-table/', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Practice sliding window', 'Solve Max Subarray', 'Review patterns'],
          resources: [],
        },
        {
          tasks: ['Two pointer technique', 'Solve Container With Most Water', 'Practice problems'],
          resources: [],
        },
        {
          tasks: ['String algorithms', 'Solve Longest Substring', 'Weekly review'],
          resources: [],
        },
      ],
    },
    {
      weekNumber: 2,
      title: 'Linked Lists & Stacks',
      goals: JSON.stringify([
        'Master Linked List operations',
        'Understand Stack/Queue patterns',
        'Complete 15 problems',
      ]),
      days: [
        {
          tasks: ['Linked List basics', 'Solve Reverse Linked List', 'Implementation practice'],
          resources: [
            { title: 'Linked Lists Guide', url: 'https://leetcode.com/explore/learn/card/linked-list/', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Stack implementation', 'Solve Valid Parentheses', 'Queue basics'],
          resources: [],
        },
        {
          tasks: ['Stack problems', 'Min Stack implementation', 'Practice exercises'],
          resources: [],
        },
        {
          tasks: ['Fast/slow pointers', 'Detect cycle in list', 'Practice problems'],
          resources: [],
        },
        {
          tasks: ['Merge two lists', 'Remove duplicates', 'Weekly wrap-up'],
          resources: [],
        },
      ],
    },
    {
      weekNumber: 3,
      title: 'Trees & Binary Search',
      goals: JSON.stringify([
        'Master tree traversals',
        'Binary Search Tree operations',
        'Solve 20 tree problems',
      ]),
      days: [
        {
          tasks: ['Binary Tree basics', 'Inorder traversal', 'Preorder traversal'],
          resources: [
            { title: 'Binary Tree Guide', url: 'https://leetcode.com/explore/learn/card/data-structure-tree/', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Level order traversal', 'Max depth of tree', 'Practice DFS'],
          resources: [],
        },
        {
          tasks: ['BST validation', 'Search in BST', 'Insert operations'],
          resources: [],
        },
        {
          tasks: ['Lowest common ancestor', 'Path sum problems', 'Tree construction'],
          resources: [],
        },
        {
          tasks: ['Serialize/deserialize', 'Tree comparison', 'Weekly review'],
          resources: [],
        },
      ],
    },
    {
      weekNumber: 4,
      title: 'Graphs & DFS/BFS',
      goals: JSON.stringify([
        'Graph representations',
        'Master DFS and BFS',
        'Solve 15 graph problems',
      ]),
      days: [
        {
          tasks: ['Graph basics', 'Adjacency list', 'DFS implementation'],
          resources: [
            { title: 'Graph Algorithms', url: 'https://leetcode.com/explore/learn/card/graph/', type: 'tutorial' },
          ],
        },
        {
          tasks: ['BFS implementation', 'Number of Islands', 'Connected components'],
          resources: [],
        },
        {
          tasks: ['Cycle detection', 'Topological sort', 'Practice problems'],
          resources: [],
        },
        {
          tasks: ['Shortest path', 'Word Ladder', 'Dijkstra basics'],
          resources: [],
        },
        {
          tasks: ['Union Find', 'Graph coloring', 'Weekly consolidation'],
          resources: [],
        },
      ],
    },
    {
      weekNumber: 5,
      title: 'Dynamic Programming Basics',
      goals: JSON.stringify([
        'Understand DP patterns',
        'Master memoization',
        'Solve 20 DP problems',
      ]),
      days: [
        {
          tasks: ['DP introduction', 'Fibonacci with memo', 'Climbing stairs'],
          resources: [
            { title: 'DP for Beginners', url: 'https://leetcode.com/explore/learn/card/dynamic-programming/', type: 'tutorial' },
          ],
        },
        {
          tasks: ['House Robber', 'Max subarray DP', 'Coin change'],
          resources: [],
        },
        {
          tasks: ['Longest increasing subsequence', 'DP optimization', 'Practice'],
          resources: [],
        },
        {
          tasks: ['2D DP problems', 'Unique paths', 'Edit distance'],
          resources: [],
        },
        {
          tasks: ['Partition problems', 'DP review', 'Pattern identification'],
          resources: [],
        },
      ],
    },
    {
      weekNumber: 6,
      title: 'Advanced Algorithms',
      goals: JSON.stringify([
        'Backtracking mastery',
        'Greedy algorithms',
        'Solve complex problems',
      ]),
      days: [
        {
          tasks: ['Backtracking intro', 'Permutations', 'Combinations'],
          resources: [
            { title: 'Backtracking Guide', url: 'https://leetcode.com/explore/learn/card/recursion-ii/', type: 'tutorial' },
          ],
        },
        {
          tasks: ['N-Queens problem', 'Sudoku solver', 'Advanced backtracking'],
          resources: [],
        },
        {
          tasks: ['Greedy algorithms', 'Interval problems', 'Meeting rooms'],
          resources: [],
        },
        {
          tasks: ['Binary search advanced', 'Search in rotated array', 'Optimization'],
          resources: [],
        },
        {
          tasks: ['Trie data structure', 'Word search', 'Weekly review'],
          resources: [],
        },
      ],
    },
    {
      weekNumber: 7,
      title: 'System Design & Concepts',
      goals: JSON.stringify([
        'System design basics',
        'Database concepts',
        'API design patterns',
      ]),
      days: [
        {
          tasks: ['Scalability concepts', 'Load balancing', 'Caching strategies'],
          resources: [
            { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'article' },
          ],
        },
        {
          tasks: ['Database design', 'SQL vs NoSQL', 'Indexing'],
          resources: [],
        },
        {
          tasks: ['API design', 'REST principles', 'Authentication'],
          resources: [],
        },
        {
          tasks: ['Microservices', 'Message queues', 'Design patterns'],
          resources: [],
        },
        {
          tasks: ['CDN', 'CAP theorem', 'Practice design question'],
          resources: [],
        },
      ],
    },
    {
      weekNumber: 8,
      title: 'Interview Prep & Mock Interviews',
      goals: JSON.stringify([
        'Practice mock interviews',
        'Review all patterns',
        'Behavioral prep',
      ]),
      days: [
        {
          tasks: ['Mock coding interview', 'Time management practice', 'Communication skills'],
          resources: [
            { title: 'Interview Tips', url: 'https://leetcode.com/discuss/interview-tips', type: 'article' },
          ],
        },
        {
          tasks: ['Behavioral questions prep', 'STAR method', 'Company research'],
          resources: [],
        },
        {
          tasks: ['Second mock interview', 'Pattern review', 'Weak areas focus'],
          resources: [],
        },
        {
          tasks: ['Final review', 'All patterns summary', 'Confidence building'],
          resources: [],
        },
        {
          tasks: ['Rest and preparation', 'Quick review', 'Ready for interviews!'],
          resources: [],
        },
      ],
    },
  ];

  // Create weeks, days, tasks, and resources
  for (const weekData of weeksData) {
    const weekStartDate = new Date(startDate);
    weekStartDate.setDate(weekStartDate.getDate() + (weekData.weekNumber - 1) * 7);
    
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    const week = await prisma.week.create({
      data: {
        weekNumber: weekData.weekNumber,
        title: weekData.title,
        goals: weekData.goals,
        sprintId: sprint.id,
        startDate: weekStartDate,
        endDate: weekEndDate,
      },
    });

    // Create days for the week (5 work days)
    for (let dayIndex = 0; dayIndex < weekData.days.length; dayIndex++) {
      const dayData = weekData.days[dayIndex];
      const dayDate = new Date(weekStartDate);
      dayDate.setDate(dayDate.getDate() + dayIndex);

      const day = await prisma.day.create({
        data: {
          dayNumber: dayIndex + 1,
          date: dayDate,
          weekId: week.id,
          notes: '',
        },
      });

      // Create tasks for the day
      for (let i = 0; i < dayData.tasks.length; i++) {
        await prisma.task.create({
          data: {
            title: dayData.tasks[i],
            dayId: day.id,
            order: i,
          },
        });
      }

      // Create resources for the day
      for (const resource of dayData.resources) {
        await prisma.resource.create({
          data: {
            title: resource.title,
            url: resource.url,
            type: resource.type,
            dayId: day.id,
          },
        });
      }
    }
  }

  console.log('✅ Database seeded successfully!');
  console.log(`Created sprint: ${sprint.title}`);
  console.log(`Created ${weeksData.length} weeks with days, tasks, and resources`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
