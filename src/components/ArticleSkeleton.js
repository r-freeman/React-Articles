import React, {Component} from 'react';

class ArticleSkeleton extends Component {
    render() {
        return (
            <div className="animate-pulse">
                <div>
                    <div className="inline-block">
                        <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-gray-200 w-16 h-5">
                        </div>
                    </div>
                </div>
                <div className="block mt-4">
                    <div className="w-full lg:w-5/6 bg-gray-200 h-5 rounded-full">
                    </div>
                    <div className="mt-3 w-full lg:w-5/6 bg-gray-200 h-5 rounded-full">
                    </div>
                    <div className="mt-3 w-full lg:w-5/6 bg-gray-200 h-5 rounded-full">
                    </div>
                </div>
                <div className="mt-6 flex items-start">
                    <div className="flex-shrink-0">
                        <div>
                            <div className="h-10 w-10 bg-gray-200 rounded-full">
                            </div>
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="rounded-full bg-gray-200 w-28 h-5">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleSkeleton;