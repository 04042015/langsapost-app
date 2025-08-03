"use client"

import { useState, useEffect } from "react"
import { Users, Edit, Eye, MessageSquare, Share2, Crown, Zap } from "lucide-react"

interface Collaborator {
  id: number
  name: string
  avatar: string
  role: "editor" | "writer" | "reviewer" | "admin"
  status: "online" | "away" | "offline"
  currentSection?: string
  lastActive: string
}

interface EditActivity {
  id: number
  user: string
  action: "edit" | "comment" | "review" | "approve"
  section: string
  timestamp: string
  content?: string
}

export default function RealTimeCollaboration() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [activities, setActivities] = useState<EditActivity[]>([])
  const [isCollaborating, setIsCollaborating] = useState(false)

  useEffect(() => {
    // Simulate real-time collaboration data
    const mockCollaborators: Collaborator[] = [
      {
        id: 1,
        name: "Ahmad Rizki",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "editor",
        status: "online",
        currentSection: "Introduction",
        lastActive: "Just now",
      },
      {
        id: 2,
        name: "Sarah Amelia",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "writer",
        status: "online",
        currentSection: "Health Section",
        lastActive: "2 min ago",
      },
      {
        id: 3,
        name: "Budi Santoso",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "reviewer",
        status: "away",
        lastActive: "15 min ago",
      },
      {
        id: 4,
        name: "Admin LangsaPost",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "admin",
        status: "online",
        lastActive: "5 min ago",
      },
    ]

    const mockActivities: EditActivity[] = [
      {
        id: 1,
        user: "Ahmad Rizki",
        action: "edit",
        section: "Paragraph 3",
        timestamp: "2 min ago",
        content: "Updated economic statistics",
      },
      {
        id: 2,
        user: "Sarah Amelia",
        action: "comment",
        section: "Health Tips",
        timestamp: "5 min ago",
        content: "Should we add more sources here?",
      },
      {
        id: 3,
        user: "Budi Santoso",
        action: "review",
        section: "Conclusion",
        timestamp: "10 min ago",
        content: "Approved with minor suggestions",
      },
      {
        id: 4,
        user: "Admin LangsaPost",
        action: "approve",
        section: "Full Article",
        timestamp: "15 min ago",
        content: "Ready for publication",
      },
    ]

    setCollaborators(mockCollaborators)
    setActivities(mockActivities)

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Add random activity
      const randomUser = mockCollaborators[Math.floor(Math.random() * mockCollaborators.length)]
      const actions = ["edit", "comment", "review"] as const
      const randomAction = actions[Math.floor(Math.random() * actions.length)]

      const newActivity: EditActivity = {
        id: Date.now(),
        user: randomUser.name,
        action: randomAction,
        section: `Section ${Math.floor(Math.random() * 5) + 1}`,
        timestamp: "Just now",
        content: `${randomAction === "edit" ? "Modified" : randomAction === "comment" ? "Commented on" : "Reviewed"} content`,
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-500 bg-red-100"
      case "editor":
        return "text-blue-500 bg-blue-100"
      case "writer":
        return "text-green-500 bg-green-100"
      case "reviewer":
        return "text-purple-500 bg-purple-100"
      default:
        return "text-gray-500 bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400"
      case "away":
        return "bg-yellow-400"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "edit":
        return <Edit className="w-3 h-3" />
      case "comment":
        return <MessageSquare className="w-3 h-3" />
      case "review":
        return <Eye className="w-3 h-3" />
      case "approve":
        return <Crown className="w-3 h-3" />
      default:
        return <Zap className="w-3 h-3" />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Live Collaboration</h3>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            LIVE
          </span>
        </div>
        <button
          onClick={() => setIsCollaborating(!isCollaborating)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isCollaborating ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isCollaborating ? "Stop Collaborating" : "Start Collaborating"}
        </button>
      </div>

      {/* Active Collaborators */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Active Collaborators ({collaborators.filter((c) => c.status === "online").length})
        </h4>
        <div className="space-y-3">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="relative">
                <img
                  src={collaborator.avatar || "/placeholder.svg"}
                  alt={collaborator.name}
                  className="w-10 h-10 rounded-full"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(collaborator.status)} rounded-full border-2 border-white dark:border-gray-700`}
                ></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h5 className="font-medium text-gray-900 dark:text-white">{collaborator.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(collaborator.role)}`}>
                    {collaborator.role}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  {collaborator.currentSection && (
                    <>
                      <span>Editing: {collaborator.currentSection}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>{collaborator.lastActive}</span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Activities</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  {getActionIcon(activity.action)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{activity.user}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{activity.action}ed</span>
                  <span className="font-medium text-blue-500 text-sm">{activity.section}</span>
                </div>
                {activity.content && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.content}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-500">{collaborators.length}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Members</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-500">{activities.length}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Activities Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-500">
              {collaborators.filter((c) => c.status === "online").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Online Now</div>
          </div>
        </div>
      </div>
    </div>
  )
}
