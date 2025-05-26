import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCardProps } from "@/types/projects/ProjectCardProps";
import { Bookmark, Edit, MoreHorizontal, Share2, Trash } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export default function ProjectCard({
	userName,
	userAvatarUrl,
	createdAt,
	title,
	description,
	state,
	city,
	locality,
	time_commitment,
	domain,
	subdomains,
	role,
}: ProjectCardProps) {
	console.log(role);
	return (
		<Card className='w-full max-w-xl shadow-md'>
			<CardHeader className='flex flex-row items-center justify-between gap-4'>
				<div className='flex items-center gap-4'>
					<Avatar className='w-10 h-10'>
						<AvatarImage
							src={userAvatarUrl}
							alt={userName}
						/>
						<AvatarFallback className='text-xl font-semibold'>
							{userName.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className='font-semibold'>{userName}</p>
						<p className='text-sm text-muted-foreground'>
							{new Date(createdAt).toLocaleString()}
						</p>
					</div>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className='p-2 rounded-full hover:bg-muted'>
							<MoreHorizontal className='h-5 w-5 text-muted-foreground' />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<DropdownMenuItem
							onClick={() => console.log("Edit project")}
						>
							<span>
								<Edit />
							</span>{" "}
							Edit Project
						</DropdownMenuItem>
						<Separator />
						<DropdownMenuItem
							className='text-red-500'
							onClick={() => console.log("Delete project")}
						>
							<span>
								<Trash />
							</span>{" "}
							Delete Project
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>

			<CardContent className='space-y-4'>
				<div>
					<CardTitle className='text-xl '>{title}</CardTitle>
					<p className='text-muted-foreground mt-1 text-sm'>
						{description}
					</p>
				</div>
				<div className='text-sm text-gray-800 space-y-1'>
					<p>
						<strong className='text-base'>Location:</strong>{" "}
						{locality}, {city}, {state}
					</p>
					<p>
						<strong className='text-base'>Time Commitment:</strong> {time_commitment}
					</p>
				</div>
				<div className='flex flex-wrap gap-2'>
					<Badge variant='outline'>#{domain}</Badge>
					{subdomains.map((sub, index) => (
						<Badge
							key={index}
							variant='outline'
						>
							#{sub}
						</Badge>
					))}
				</div>
				<div className='border-t pt-4 flex gap-4 justify-between text-sm text-muted-foreground'>
					{role === "volunteer" ? (
						<>
							<Button variant='default'>Join Project</Button>
							<Button variant='outline'>Show Interest</Button>
						</>
					) : (
						<p className='text-sm text-muted-foreground'>
							You created this project
						</p>
					)}

					<div className='flex gap-4 ml-auto'>
						<Button
							variant='ghost'
							size='icon'
						>
							<Bookmark />
						</Button>
						<Button
							variant='ghost'
							size='icon'
						>
							<Share2 />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
