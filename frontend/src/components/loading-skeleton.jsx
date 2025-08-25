import { Card, CardContent, CardHeader } from "./ui/card"

export function TranslationSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
            <div className="h-10 w-10 bg-muted rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-muted rounded w-16"></div>
            <div className="h-10 bg-muted rounded w-24"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function SummarizationSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="h-4 bg-muted rounded w-1/4 mb-3"></div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-4 bg-muted rounded w-1/4 mb-3"></div>
            <div className="h-2 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-muted rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
            </div>
            <div className="h-10 bg-muted rounded w-24"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
