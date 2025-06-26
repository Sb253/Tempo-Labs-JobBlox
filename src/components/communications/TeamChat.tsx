import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Send,
  Plus,
  Settings,
  Users,
  Bell,
  Search,
  Phone,
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  Hash,
  Lock,
  Globe,
  UserPlus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "online" | "away" | "busy" | "offline";
  lastSeen?: string;
}

interface Channel {
  id: string;
  name: string;
  type: "public" | "private" | "direct";
  description?: string;
  memberCount: number;
  unreadCount: number;
  lastMessage?: {
    content: string;
    sender: string;
    timestamp: string;
  };
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "image" | "system";
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  isEdited?: boolean;
}

const TeamChat = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>("general");
  const [messageInput, setMessageInput] = useState("");
  const [isNewChannelDialogOpen, setIsNewChannelDialogOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  const [newChannelType, setNewChannelType] = useState<"public" | "private">(
    "public",
  );

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Smith",
      role: "Project Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      status: "online",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Site Supervisor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      status: "away",
      lastSeen: "5 minutes ago",
    },
    {
      id: "3",
      name: "Mike Wilson",
      role: "Foreman",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      status: "busy",
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Safety Officer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      status: "online",
    },
    {
      id: "5",
      name: "David Brown",
      role: "Electrician",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      status: "offline",
      lastSeen: "2 hours ago",
    },
  ];

  const channels: Channel[] = [
    {
      id: "general",
      name: "general",
      type: "public",
      description: "General team discussions",
      memberCount: 12,
      unreadCount: 3,
      lastMessage: {
        content: "The materials for the kitchen renovation have arrived",
        sender: "John Smith",
        timestamp: "2 minutes ago",
      },
    },
    {
      id: "project-alpha",
      name: "project-alpha",
      type: "private",
      description: "Alpha project coordination",
      memberCount: 5,
      unreadCount: 0,
      lastMessage: {
        content: "Updated the timeline for phase 2",
        sender: "Sarah Johnson",
        timestamp: "1 hour ago",
      },
    },
    {
      id: "safety-alerts",
      name: "safety-alerts",
      type: "public",
      description: "Safety updates and alerts",
      memberCount: 15,
      unreadCount: 1,
      lastMessage: {
        content: "New safety protocol for electrical work",
        sender: "Emily Davis",
        timestamp: "3 hours ago",
      },
    },
    {
      id: "random",
      name: "random",
      type: "public",
      description: "Non-work related chat",
      memberCount: 8,
      unreadCount: 0,
      lastMessage: {
        content: "Anyone up for lunch at the new place?",
        sender: "Mike Wilson",
        timestamp: "4 hours ago",
      },
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "1",
      senderName: "John Smith",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      content: "Good morning team! Let's review today's priorities.",
      timestamp: "9:00 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: "2",
      senderName: "Sarah Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content: "The concrete pour is scheduled for 10 AM. All hands on deck!",
      timestamp: "9:15 AM",
      type: "text",
      reactions: [
        { emoji: "👍", count: 3, users: ["1", "3", "4"] },
        { emoji: "💪", count: 2, users: ["1", "5"] },
      ],
    },
    {
      id: "3",
      senderId: "4",
      senderName: "Emily Davis",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      content:
        "Safety reminder: Hard hats and safety vests are mandatory on site today.",
      timestamp: "9:30 AM",
      type: "text",
    },
    {
      id: "4",
      senderId: "3",
      senderName: "Mike Wilson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      content:
        "Weather looks good for the pour. No rain expected until evening.",
      timestamp: "9:45 AM",
      type: "text",
      reactions: [{ emoji: "☀️", count: 4, users: ["1", "2", "4", "5"] }],
    },
    {
      id: "5",
      senderId: "system",
      senderName: "System",
      content: "David Brown joined the channel",
      timestamp: "10:00 AM",
      type: "system",
    },
    {
      id: "6",
      senderId: "5",
      senderName: "David Brown",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      content:
        "Just finished the electrical rough-in for the second floor. Ready for inspection.",
      timestamp: "10:15 AM",
      type: "text",
      reactions: [{ emoji: "✅", count: 2, users: ["1", "2"] }],
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", {
        channel: selectedChannel,
        content: messageInput,
        timestamp: new Date().toISOString(),
      });
      setMessageInput("");
    }
  };

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      // In a real app, this would create the channel
      console.log("Creating channel:", {
        name: newChannelName,
        description: newChannelDescription,
        type: newChannelType,
      });
      setNewChannelName("");
      setNewChannelDescription("");
      setIsNewChannelDialogOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "private":
        return <Lock className="w-4 h-4 text-gray-500" />;
      case "public":
        return <Hash className="w-4 h-4 text-gray-500" />;
      case "direct":
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
      default:
        return <Hash className="w-4 h-4 text-gray-500" />;
    }
  };

  const selectedChannelData = channels.find((c) => c.id === selectedChannel);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-900">Team Chat</h1>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search channels, messages..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="channels" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent
              value="channels"
              className="flex-1 overflow-hidden mt-4"
            >
              <div className="px-4 mb-4">
                <Dialog
                  open={isNewChannelDialogOpen}
                  onOpenChange={setIsNewChannelDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      New Channel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Channel</DialogTitle>
                      <DialogDescription>
                        Create a new channel for team communication.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Channel Name
                        </label>
                        <Input
                          placeholder="e.g., project-beta"
                          value={newChannelName}
                          onChange={(e) => setNewChannelName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Description
                        </label>
                        <Textarea
                          placeholder="What's this channel about?"
                          value={newChannelDescription}
                          onChange={(e) =>
                            setNewChannelDescription(e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Privacy
                        </label>
                        <Select
                          value={newChannelType}
                          onValueChange={(value: "public" | "private") =>
                            setNewChannelType(value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center">
                                <Globe className="w-4 h-4 mr-2" />
                                Public - Anyone can join
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center">
                                <Lock className="w-4 h-4 mr-2" />
                                Private - Invite only
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsNewChannelDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateChannel}>
                        Create Channel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <ScrollArea className="flex-1 px-4">
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedChannel === channel.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          {getChannelIcon(channel.type)}
                          <span className="font-medium text-sm">
                            {channel.name}
                          </span>
                        </div>
                        {channel.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                            {channel.unreadCount}
                          </Badge>
                        )}
                      </div>
                      {channel.lastMessage && (
                        <div className="text-xs text-gray-500 truncate">
                          <span className="font-medium">
                            {channel.lastMessage.sender}:
                          </span>{" "}
                          {channel.lastMessage.content}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent
              value="members"
              className="flex-1 overflow-hidden mt-4"
            >
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                            member.status,
                          )}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {member.role}
                        </p>
                        {member.status === "offline" && member.lastSeen && (
                          <p className="text-xs text-gray-400">
                            Last seen {member.lastSeen}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedChannelData && getChannelIcon(selectedChannelData.type)}
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {selectedChannelData?.name}
                </h2>
                {selectedChannelData?.description && (
                  <p className="text-sm text-gray-500">
                    {selectedChannelData.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <UserPlus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-3">
                {message.type !== "system" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage
                      src={message.senderAvatar}
                      alt={message.senderName}
                    />
                    <AvatarFallback>
                      {message.senderName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`flex-1 ${message.type === "system" ? "text-center" : ""}`}
                >
                  {message.type === "system" ? (
                    <div className="text-sm text-gray-500 italic">
                      {message.content}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-slate-900">
                          {message.senderName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                        {message.isEdited && (
                          <span className="text-xs text-gray-400">
                            (edited)
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-700 mb-2">
                        {message.content}
                      </div>
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex items-center space-x-2">
                          {message.reactions.map((reaction, index) => (
                            <button
                              key={index}
                              className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-1 text-xs"
                            >
                              <span>{reaction.emoji}</span>
                              <span>{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                placeholder={`Message #${selectedChannelData?.name || "channel"}`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[60px] resize-none"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{selectedChannelData?.memberCount || 0} members</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
