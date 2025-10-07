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
  const startDate = new Date('2025-10-07');
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
            { title: 'Two Sum Problem', url: 'https://leetcode.com/problems/two-sum/', type: 'problem' },
            { title: 'String Manipulation', url: 'https://www.geeksforgeeks.org/string-manipulation-in-python/', type: 'article' },
          ],
        },
        {
          tasks: ['Learn Hash Maps', 'Solve Valid Anagram', 'Study time complexity'],
          resources: [
            { title: 'Hash Table Guide', url: 'https://leetcode.com/explore/learn/card/hash-table/', type: 'tutorial' },
            { title: 'Valid Anagram Problem', url: 'https://leetcode.com/problems/valid-anagram/', type: 'problem' },
            { title: 'Big O Notation', url: 'https://www.bigocheatsheet.com/', type: 'article' },
          ],
        },
        {
          tasks: ['Practice sliding window', 'Solve Max Subarray', 'Review patterns'],
          resources: [
            { title: 'Sliding Window Technique', url: 'https://leetcode.com/problems/maximum-subarray/', type: 'tutorial' },
            { title: 'Maximum Subarray Problem', url: 'https://leetcode.com/problems/maximum-subarray/', type: 'problem' },
            { title: 'Common Patterns', url: 'https://www.educative.io/courses/grokking-the-coding-interview/YQw2M0rJYvN', type: 'article' },
          ],
        },
        {
          tasks: ['Two pointer technique', 'Solve Container With Most Water', 'Practice problems'],
          resources: [
            { title: 'Two Pointer Technique', url: 'https://leetcode.com/problems/container-with-most-water/', type: 'tutorial' },
            { title: 'Container With Most Water Problem', url: 'https://leetcode.com/problems/container-with-most-water/', type: 'problem' },
            { title: 'Practice Problems', url: 'https://leetcode.com/problemset/all/', type: 'article' },
          ],
        },
        {
          tasks: ['String algorithms', 'Solve Longest Substring', 'Weekly review'],
          resources: [
            { title: 'String Algorithms', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', type: 'tutorial' },
            { title: 'Longest Substring Problem', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', type: 'problem' },
            { title: 'Weekly Review Tips', url: 'https://www.interviewcake.com/article/python/leetcode-review-strategy', type: 'article' },
          ],
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
          tasks: ['Learn Linked List structure', 'Solve Reverse Linked List', 'Practice node manipulation'],
          resources: [
            { title: 'Linked Lists Guide', url: 'https://leetcode.com/explore/learn/card/linked-list/', type: 'tutorial' },
            { title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', type: 'problem' },
            { title: 'Node Operations', url: 'https://www.geeksforgeeks.org/linked-list-set-1-introduction/', type: 'article' },
          ],
        },
        {
          tasks: ['Stack implementation basics', 'Solve Valid Parentheses', 'Learn Queue operations'],
          resources: [
            { title: 'Stack Data Structure', url: 'https://leetcode.com/explore/learn/card/queue-stack/', type: 'tutorial' },
            { title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', type: 'problem' },
            { title: 'Queue Implementation', url: 'https://www.geeksforgeeks.org/queue-data-structure/', type: 'article' },
          ],
        },
        {
          tasks: ['Practice stack problems', 'Implement Min Stack', 'Solve Next Greater Element'],
          resources: [
            { title: 'Min Stack Problem', url: 'https://leetcode.com/problems/min-stack/', type: 'problem' },
            { title: 'Next Greater Element', url: 'https://leetcode.com/problems/next-greater-element-i/', type: 'problem' },
            { title: 'Stack Applications', url: 'https://www.educative.io/courses/data-structures-coding-interviews-python/m2YJNN6X9oZ', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Fast and slow pointers', 'Detect cycle in linked list', 'Find middle of list'],
          resources: [
            { title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', type: 'problem' },
            { title: 'Middle of Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/', type: 'problem' },
            { title: 'Two Pointer Technique', url: 'https://leetcode.com/articles/two-pointer-technique/', type: 'article' },
          ],
        },
        {
          tasks: ['Merge Two Sorted Lists', 'Remove duplicates from list', 'Weekly pattern review'],
          resources: [
            { title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', type: 'problem' },
            { title: 'Remove Duplicates', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', type: 'problem' },
            { title: 'Linked List Patterns', url: 'https://www.educative.io/courses/grokking-the-coding-interview/B1PzmqOKDLQ', type: 'article' },
          ],
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
          tasks: ['Binary Tree structure basics', 'Implement Inorder traversal', 'Practice Preorder traversal'],
          resources: [
            { title: 'Binary Tree Guide', url: 'https://leetcode.com/explore/learn/card/data-structure-tree/', type: 'tutorial' },
            { title: 'Binary Tree Inorder', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', type: 'problem' },
            { title: 'Binary Tree Preorder', url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', type: 'problem' },
          ],
        },
        {
          tasks: ['Level order traversal (BFS)', 'Find Maximum Depth', 'Practice DFS variations'],
          resources: [
            { title: 'Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', type: 'problem' },
            { title: 'Maximum Depth', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', type: 'problem' },
            { title: 'Tree DFS Patterns', url: 'https://www.educative.io/courses/grokking-the-coding-interview/xVOEVRGLyom', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Validate Binary Search Tree', 'Search in BST', 'Insert into BST'],
          resources: [
            { title: 'Validate BST', url: 'https://leetcode.com/problems/validate-binary-search-tree/', type: 'problem' },
            { title: 'Search in BST', url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', type: 'problem' },
            { title: 'Insert into BST', url: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', type: 'problem' },
          ],
        },
        {
          tasks: ['Lowest Common Ancestor', 'Binary Tree Path Sum', 'Construct tree from arrays'],
          resources: [
            { title: 'Lowest Common Ancestor', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', type: 'problem' },
            { title: 'Path Sum', url: 'https://leetcode.com/problems/path-sum/', type: 'problem' },
            { title: 'Construct Binary Tree', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', type: 'problem' },
          ],
        },
        {
          tasks: ['Serialize and Deserialize tree', 'Same Tree comparison', 'Weekly tree review'],
          resources: [
            { title: 'Serialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', type: 'problem' },
            { title: 'Same Tree', url: 'https://leetcode.com/problems/same-tree/', type: 'problem' },
            { title: 'Tree Problem Patterns', url: 'https://www.educative.io/courses/grokking-the-coding-interview/xVQyDZzx5qz', type: 'article' },
          ],
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
          tasks: ['Graph representations study', 'Build adjacency list', 'Implement DFS recursively'],
          resources: [
            { title: 'Graph Algorithms', url: 'https://leetcode.com/explore/learn/card/graph/', type: 'tutorial' },
            { title: 'Graph Representation', url: 'https://www.geeksforgeeks.org/graph-and-its-representations/', type: 'article' },
            { title: 'DFS Implementation', url: 'https://leetcode.com/problems/clone-graph/', type: 'problem' },
          ],
        },
        {
          tasks: ['Implement BFS iteratively', 'Solve Number of Islands', 'Find connected components'],
          resources: [
            { title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', type: 'problem' },
            { title: 'BFS Traversal', url: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/', type: 'tutorial' },
            { title: 'Connected Components', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', type: 'problem' },
          ],
        },
        {
          tasks: ['Detect cycle in graph', 'Learn topological sort', 'Course Schedule problem'],
          resources: [
            { title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', type: 'problem' },
            { title: 'Topological Sort', url: 'https://www.geeksforgeeks.org/topological-sorting/', type: 'tutorial' },
            { title: 'Cycle Detection', url: 'https://leetcode.com/problems/course-schedule-ii/', type: 'problem' },
          ],
        },
        {
          tasks: ['Shortest path algorithms', 'Solve Word Ladder', 'Introduction to Dijkstra'],
          resources: [
            { title: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/', type: 'problem' },
            { title: 'Shortest Path', url: 'https://www.geeksforgeeks.org/shortest-path-unweighted-graph/', type: 'tutorial' },
            { title: 'Dijkstra Algorithm', url: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/', type: 'article' },
          ],
        },
        {
          tasks: ['Union Find data structure', 'Graph coloring problems', 'Weekly graph consolidation'],
          resources: [
            { title: 'Union Find', url: 'https://leetcode.com/problems/number-of-provinces/', type: 'problem' },
            { title: 'Graph Coloring', url: 'https://leetcode.com/problems/is-graph-bipartite/', type: 'problem' },
            { title: 'Graph Patterns Summary', url: 'https://www.educative.io/courses/grokking-the-coding-interview/YQN8X1gBWQh', type: 'article' },
          ],
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
          tasks: ['DP concept introduction', 'Fibonacci with memoization', 'Solve Climbing Stairs'],
          resources: [
            { title: 'DP for Beginners', url: 'https://leetcode.com/explore/learn/card/dynamic-programming/', type: 'tutorial' },
            { title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', type: 'problem' },
            { title: 'Memoization vs Tabulation', url: 'https://www.geeksforgeeks.org/tabulation-vs-memoization/', type: 'article' },
          ],
        },
        {
          tasks: ['House Robber problem', 'Maximum Subarray DP approach', 'Coin Change problem'],
          resources: [
            { title: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', type: 'problem' },
            { title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', type: 'problem' },
            { title: 'DP Optimization', url: 'https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/m2G1pAq0OO0', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Longest Increasing Subsequence', 'Space optimization techniques', 'More DP practice'],
          resources: [
            { title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', type: 'problem' },
            { title: 'Space Optimization', url: 'https://www.geeksforgeeks.org/space-optimized-solution-lcs/', type: 'article' },
            { title: 'DP Pattern Recognition', url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns', type: 'article' },
          ],
        },
        {
          tasks: ['2D DP problems introduction', 'Unique Paths problem', 'Edit Distance algorithm'],
          resources: [
            { title: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', type: 'problem' },
            { title: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', type: 'problem' },
            { title: '2D DP Patterns', url: 'https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/3jEPRo5PDvx', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Partition problems practice', 'DP patterns review', 'Pattern identification exercises'],
          resources: [
            { title: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', type: 'problem' },
            { title: 'DP Problem Categories', url: 'https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RM1BDv71V60', type: 'article' },
            { title: 'Pattern Identification Guide', url: 'https://leetcode.com/discuss/general-discussion/662866/dp-for-beginners-problems-patterns-sample-solutions', type: 'article' },
          ],
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
          tasks: ['Backtracking fundamentals', 'Generate Permutations', 'Generate Combinations'],
          resources: [
            { title: 'Backtracking Guide', url: 'https://leetcode.com/explore/learn/card/recursion-ii/', type: 'tutorial' },
            { title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', type: 'problem' },
            { title: 'Combinations', url: 'https://leetcode.com/problems/combinations/', type: 'problem' },
          ],
        },
        {
          tasks: ['N-Queens problem solution', 'Sudoku Solver implementation', 'Advanced backtracking patterns'],
          resources: [
            { title: 'N-Queens', url: 'https://leetcode.com/problems/n-queens/', type: 'problem' },
            { title: 'Sudoku Solver', url: 'https://leetcode.com/problems/sudoku-solver/', type: 'problem' },
            { title: 'Backtracking Patterns', url: 'https://www.educative.io/courses/grokking-the-coding-interview/NE5109Jl02v', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Greedy algorithm concepts', 'Interval scheduling problems', 'Meeting Rooms problem'],
          resources: [
            { title: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii/', type: 'problem' },
            { title: 'Greedy Algorithms', url: 'https://www.geeksforgeeks.org/greedy-algorithms/', type: 'tutorial' },
            { title: 'Interval Problems', url: 'https://leetcode.com/problems/merge-intervals/', type: 'problem' },
          ],
        },
        {
          tasks: ['Advanced Binary Search', 'Search in Rotated Array', 'Binary search optimization'],
          resources: [
            { title: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', type: 'problem' },
            { title: 'Binary Search Variations', url: 'https://leetcode.com/explore/learn/card/binary-search/', type: 'tutorial' },
            { title: 'Find Peak Element', url: 'https://leetcode.com/problems/find-peak-element/', type: 'problem' },
          ],
        },
        {
          tasks: ['Trie data structure', 'Word Search II', 'Weekly advanced patterns review'],
          resources: [
            { title: 'Implement Trie', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/', type: 'problem' },
            { title: 'Word Search II', url: 'https://leetcode.com/problems/word-search-ii/', type: 'problem' },
            { title: 'Trie Applications', url: 'https://www.geeksforgeeks.org/trie-insert-and-search/', type: 'tutorial' },
          ],
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
          tasks: ['Scalability fundamentals', 'Load balancing strategies', 'Caching mechanisms study'],
          resources: [
            { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'article' },
            { title: 'Load Balancing', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/3jEwl04BL7Q', type: 'tutorial' },
            { title: 'Caching Strategies', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/3j6NnJrpp5p', type: 'article' },
          ],
        },
        {
          tasks: ['Database design principles', 'SQL vs NoSQL comparison', 'Database indexing strategies'],
          resources: [
            { title: 'Database Design', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/YQlK1mDPgpK', type: 'tutorial' },
            { title: 'SQL vs NoSQL', url: 'https://www.mongodb.com/nosql-explained/nosql-vs-sql', type: 'article' },
            { title: 'Database Indexing', url: 'https://use-the-index-luke.com/', type: 'article' },
          ],
        },
        {
          tasks: ['RESTful API design', 'REST principles deep dive', 'Authentication methods'],
          resources: [
            { title: 'REST API Design', url: 'https://restfulapi.net/', type: 'tutorial' },
            { title: 'API Authentication', url: 'https://auth0.com/learn/token-based-authentication-made-easy/', type: 'article' },
            { title: 'HTTP Status Codes', url: 'https://httpstatuses.com/', type: 'article' },
          ],
        },
        {
          tasks: ['Microservices architecture', 'Message queues concepts', 'Design patterns review'],
          resources: [
            { title: 'Microservices', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/B8nMkqBWONo', type: 'tutorial' },
            { title: 'Message Queues', url: 'https://www.cloudamqp.com/blog/what-is-message-queuing.html', type: 'article' },
            { title: 'Design Patterns', url: 'https://refactoring.guru/design-patterns', type: 'article' },
          ],
        },
        {
          tasks: ['CDN and content delivery', 'CAP theorem understanding', 'Practice system design question'],
          resources: [
            { title: 'CDN Concepts', url: 'https://www.cloudflare.com/learning/cdn/what-is-a-cdn/', type: 'article' },
            { title: 'CAP Theorem', url: 'https://www.educative.io/courses/grokking-the-system-design-interview/RMlM3NgjAyR', type: 'tutorial' },
            { title: 'System Design Questions', url: 'https://github.com/checkcheckzz/system-design-interview', type: 'article' },
          ],
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
          tasks: ['First mock coding interview', 'Time management practice', 'Communication skills development'],
          resources: [
            { title: 'Interview Tips', url: 'https://leetcode.com/discuss/interview-tips', type: 'article' },
            { title: 'Coding Interview Guide', url: 'https://www.educative.io/courses/grokking-the-coding-interview/Y52qNM0ljWK', type: 'tutorial' },
            { title: 'Interview Communication', url: 'https://www.interviewcake.com/article/python/coding-interview-tips', type: 'article' },
          ],
        },
        {
          tasks: ['Behavioral questions preparation', 'STAR method practice', 'Company research techniques'],
          resources: [
            { title: 'Behavioral Interview Guide', url: 'https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique', type: 'article' },
            { title: 'STAR Method', url: 'https://www.themuse.com/advice/star-interview-method', type: 'tutorial' },
            { title: 'Company Research', url: 'https://www.glassdoor.com/blog/guide/how-to-research-company-before-interview/', type: 'article' },
          ],
        },
        {
          tasks: ['Second mock interview', 'Review weak patterns', 'Focus on problem areas'],
          resources: [
            { title: 'Mock Interview Platform', url: 'https://interviewing.io/', type: 'article' },
            { title: 'Common Mistakes', url: 'https://leetcode.com/discuss/interview-question/449920/Common-Coding-Interview-Mistakes', type: 'article' },
            { title: 'Pattern Review', url: 'https://www.educative.io/courses/grokking-the-coding-interview/gx2OqlvEnWG', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Comprehensive pattern review', 'Algorithm complexity review', 'Confidence building exercises'],
          resources: [
            { title: 'Algorithm Cheat Sheet', url: 'https://www.bigocheatsheet.com/', type: 'article' },
            { title: 'Pattern Summary', url: 'https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed', type: 'article' },
            { title: 'Final Review Guide', url: 'https://www.interviewcake.com/coding-interview-tips', type: 'tutorial' },
          ],
        },
        {
          tasks: ['Light review and rest', 'Quick pattern refresh', 'Mental preparation for interviews'],
          resources: [
            { title: 'Interview Day Tips', url: 'https://www.glassdoor.com/blog/interview-day-tips/', type: 'article' },
            { title: 'Stress Management', url: 'https://www.indeed.com/career-advice/interviewing/how-to-calm-interview-nerves', type: 'article' },
            { title: 'Final Confidence Boost', url: 'https://www.themuse.com/advice/how-to-feel-confident-going-into-an-interview', type: 'tutorial' },
          ],
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
